const keystone = require("keystone");
const moment = require("moment");
const mongoose = require("mongoose");
const Dataset = keystone.list("Dataset");
const Datapoint = keystone.list("Datapoint");
const Fieldsite = keystone.list("Fieldsite");
const Attachment = keystone.list("Attachment");
const _ = require("lodash");
const mailer = require("../../utils/emailer");
const analyzer = require("../../utils/analyzer");
const dataService = require("../../utils/data.service");
const std = require("../../utils/standardize");
const azure = require("azure-storage");
const path = require("path");
const fs = require("fs");
const enums = require("../../utils/enums");

/**
 * Update File by ID
 */
exports.update = async function (req, res) {
	Dataset.model.findById(req.params.id).exec(function (err, dataItem) {
		if (err) {
			mailer.emailAdmin(
				`An invalid dataset id was provided to upload page controller. ID is ${req.params.id} and user is ${req.user.first} ${req.user.last}`
			);
			return res.apiError("An unknown database error occurred", err);
		}

		if (!dataItem)
			return res.apiError("Dataset was not uploaded, please try again");

		const data = req.method == "POST" ? req.body : req.query;

		dataItem.getUpdateHandler(req).process(data, async function (err) {
			if (err)
				return res.apiError(
					"Dataset was not updated with fieldsite, please try uploading again",
					err
				);

			await associateDatasetWithUser(req.user._id, dataItem._id);

			await associateDatasetWithFieldsite(data.fieldsite, dataItem._id);

			const project = await dataService.getProjectByFieldsite(data.fieldsite);
			const country = await dataService.getCountryByProject(project._id);
			const fieldsite = await dataService.getFieldsiteById(data.fieldsite);

			const originalFileExtension = path.extname(dataItem.file.filename);
			const originalFileWithoutExtension = dataItem.file.filename.replace(
				originalFileExtension,
				""
			);
			const targetBlobName = `${dataService.sanitizeStr(
				data.name
			)}__${dataService.sanitizeStr(
				originalFileWithoutExtension.slice(
					originalFileWithoutExtension.length - 4
				)
			)}__${dataService.sanitizeStr(fieldsite.name)}__${dataService.sanitizeStr(
				data.dateOfReading
			)}__${dataService.sanitizeStr(
				data.maxDurationHours
			)}__${dataService.sanitizeStr(data.confidenceLevel)}`;
			const stdBlobName = targetBlobName + ".csv";
			const rawBlobName = targetBlobName + originalFileExtension;

			await renameBlobFile(
				dataItem.file.url,
				rawBlobName,
				process.env.AZURE_STORAGE_CONTAINER
			);

			if (process.env.STANDARDIZE_DATASET == 1) {
				await renameBlobFile(
					dataItem.file.url
						.replace(
							process.env.AZURE_STORAGE_CONTAINER,
							process.env.AZURE_STORAGE_CONTAINER_STD
						)
						.replace(originalFileExtension, ".csv"),
					stdBlobName,
					process.env.AZURE_STORAGE_CONTAINER_STD
				);
			}

			const rawDataURL = await getBlobURL(
				process.env.AZURE_STORAGE_CONTAINER,
				rawBlobName
			);
			const stdDataURL = await getBlobURL(
				process.env.AZURE_STORAGE_CONTAINER_STD,
				stdBlobName
			);

			await updateDatasetBlobInfo(
				data.id,
				rawDataURL,
				rawBlobName,
				stdDataURL,
				stdBlobName
			);

			await updateDatasetWithBlobPrefix(
				data.id,
				country.name,
				`${dataService.getIdentifier(project)}/${dataService.getIdentifier(
					fieldsite
				)}`
			);

			await analyzer.notifyFileUpload(
				stdBlobName,
				req.user.email,
				country,
				project,
				fieldsite,
				req.user,
				dataItem
			);

			res.apiResponse({
				file: dataItem,
			});
		});
	});
};

exports.analyze = async function (req, res) {
	// get all rows within the time frame for the fieldsite
	const startDate = new Date(req.body.startDate);
	const endDate = new Date(req.body.endDate);
	endDate.setDate(endDate.getDate() + 1);
	const fieldsiteId = req.body.fieldsite;
	const datapoints = await Datapoint.model
		.find({ fieldsite: fieldsiteId })
		.where("tsDate")
		.gte(startDate)
		.lt(endDate)
		.exec();

	if (!datapoints.length) {
		// res.status(404).send('Could not find any datapoints in the given date range');
		res
			.status(404)
			.json({ error: "Could not find any datapoints in the given date range" });
		return;
	}

	const fieldsite = await Fieldsite.model.findOne({ _id: fieldsiteId }).exec();

	let currDate = moment().format("YYYYMMDD");
	const dataset = new Dataset.model({
		name: req.body.datasetName,
		description: req.body.datasetDescription,
		dateOfReading: new Date(),
		fieldsite: fieldsiteId,
		user: req.user._id,
		archived: false,
	});
	const blobName = `${req.body.datasetName}__${dataset.id.slice(-4)}__${
		fieldsite.name
	}__${currDate}__${req.body.maxDurationHours}__${
		req.body.confidenceLevel
	}.csv`;

	// create CSV with standardized datapoints
	const blobResult = await dataService.createCsv(datapoints, blobName);
	let blobUrl;
	if (blobResult) {
		blobUrl = await getBlobURL(
			process.env.AZURE_STORAGE_CONTAINER_STD,
			blobName
		);
	} else {
		res.status(500).send("Could not retrieve data from storage");
		return;
	}

	dataset.set({
		"stdFile.url": blobUrl,
		"stdFile.filename": blobName,
		"stdFile.container": process.env.AZURE_STORAGE_CONTAINER_STD,
	});

	dataset.save();

	dataset.runAnalysis();

	res.send({ datapoints: datapoints, blobUrl: blobUrl });
};

exports.append = async function (req, res) {
	let files;
	const fieldsiteId = req.body.fieldsite;

	if (!req.files) {
		res.status(400);
		return;
	}
  
	if (req.files.uploaded_files instanceof Array) {
    files = _.flattenDeep(req.files.uploaded_files);
	} else {
    files = [req.files.uploaded_files];
	}
  
  res.json({
    uploaded_count: files.length,
  });

	const attachment = new Attachment.model({
		user: req.user._id,
		fieldsite: fieldsiteId,
	});

	const DataTypes = enums.DataTypes;

	const appendData = (dataRows, type) => {
		dataRows.forEach((row) => {
			dataService.createDatapoint(
				row,
				fieldsiteId,
				attachment.id,
				type,
				req.body.overwrite
			);
		});
	};

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const stream = fs.createReadStream(file.path);
		const ext = path.extname(file.originalname).substring(1);
		const data = await std.standardize(stream, ext);

		Object.values(DataTypes).forEach((dataType) => {
			appendData(data[dataType], dataType);
		});
		// appendData(data.standardized, DataTypes.STANDARDIZED);
		// appendData(data.raw, DataTypes.RAW);
		// appendData(data.skipped, DataTypes.SKIPPED);
	}

	attachment.save();
}

// exports.append = async function (req, res) {
//   let files;
//   const fieldsite = req.body.fieldsite;

//   if (!req.files) {
//     res.status(400);
//     return;
//   }

//   if (req.files.uploaded_files instanceof Array) {
//     files = _.flattenDeep(req.files.uploaded_files);
//   } else {
//     files = [req.files.uploaded_files]
//   }

//   let count = 0;

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const stream = fs.createReadStream(file.path);
//     const ext = path.extname(file.originalname).substring(1);
//     const data = await std.standardize(stream, ext);

//     for (let j = 0; j < data.standardized.length; j++) {
//       const row = data.standardized[j];
//       count += await dataService.createDatapoint(row, fieldsite, req.body.overwrite);
//     }

//   }

//   res.json({
//     'uploaded_count': files.length,
//     'rows_added': count
//   })
// }

async function getBlobURL(containerName, blobName) {
	const retryOperations = new azure.LinearRetryPolicyFilter();
	const blobService = azure.createBlobService().withFilter(retryOperations);
	return new Promise((resolve, reject) => {
		const url = blobService.getUrl(containerName, blobName);
		resolve(url);
	});
}

async function renameBlobFile(sourceURI, targetBlobName, containerName) {
	const retryOperations = new azure.LinearRetryPolicyFilter();
	const blobService = azure.createBlobService().withFilter(retryOperations);
	return new Promise((resolve, reject) => {
		blobService.startCopyBlob(
			sourceURI,
			containerName,
			targetBlobName,
			(err, _result) => {
				if (err) {
					console.log(
						`Error occurred while renaming blobs on Azure, container name is ${containerName}, source is ${sourceURI}, target is ${targetBlobName} and error is ${err}`
					);
					reject(err);
				}

				const srcBlobName = sourceURI.substring(sourceURI.lastIndexOf("/") + 1);
				blobService.deleteBlob(containerName, srcBlobName, (err, response) => {
					if (err) {
						reject(err);
					}
					resolve(response);
				});
			}
		);
	});
}

async function updateDatasetBlobInfo(
	datasetId,
	rawDataURL,
	rawBlobName,
	stdDataURL,
	stdBlobName
) {
	const setQuery = {
		"file.url": rawDataURL,
		"file.filename": rawBlobName,
		"stdFile.url": stdDataURL,
		"stdFile.filename": stdBlobName,
		"stdFile.container": process.env.AZURE_STORAGE_CONTAINER_STD,
	};
	return Dataset.model
		.findOneAndUpdate({ _id: datasetId }, { $set: setQuery }, { strict: false })
		.exec();
}

async function updateDatasetWithBlobPrefix(datasetId, containerName, prefix) {
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{
				$set: {
					analysisContainer: containerName,
					analysisBlobPrefix: prefix,
					archived: false,
				},
			}
		)
		.exec();
}

/**
 * Update dataset record with current user's ID
 */
async function associateDatasetWithUser(userId, datasetId) {
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{ $set: { user: mongoose.Types.ObjectId(userId) } }
		)
		.exec();
}

/**
 * Update dataset record with selected fieldsite ID
 */
async function associateDatasetWithFieldsite(fieldsiteIdStr, datasetId) {
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{ $set: { fieldsite: mongoose.Types.ObjectId(fieldsiteIdStr) } }
		)
		.exec();
}

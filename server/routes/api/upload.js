const keystone = require("keystone");
const moment = require("moment");
const Dataset = keystone.list("Dataset");
const Datapoint = keystone.list("Datapoint");
const Fieldsite = keystone.list("Fieldsite");
const _ = require("lodash");
const mailer = require("../../utils/emailer");
const analyzer = require("../../utils/analyzer");
const dataService = require("../../utils/data.service");
const { BlobServiceClient } = require("@azure/storage-blob");
const { QueueServiceClient } = require("@azure/storage-queue");
const path = require("path");

const std = require("../../utils/standardize");
const Upload = keystone.list("Upload");
const { DataTypes } = require("../../utils/enums");
const fs = require("fs");

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

			await dataService.associateDatasetWithUser(
				req.user._id,
				dataItem._id
			);

			await dataService.associateDatasetWithFieldsite(
				data.fieldsite,
				dataItem._id
			);

			const project = await dataService.getProjectByFieldsite(
				data.fieldsite
			);
			const country = await dataService.getCountryByProject(project._id);
			const fieldsite = await dataService.getFieldsiteById(
				data.fieldsite
			);

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
			)}__${dataService.sanitizeStr(
				fieldsite.name
			)}__${dataService.sanitizeStr(
				data.dateOfReading
			)}__${dataService.sanitizeStr(
				data.maxDurationHours
			)}__${dataService.sanitizeStr(data.confidenceLevel)}`;
			const stdBlobName = targetBlobName + ".csv";
			const rawBlobName = targetBlobName + originalFileExtension;

			await dataService.renameBlobFile(
				dataItem.file.url,
				rawBlobName,
				process.env.AZURE_STORAGE_CONTAINER
			);

			if (process.env.STANDARDIZE_DATASET == 1) {
				await dataService.renameBlobFile(
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

			const rawDataURL = await dataService.getBlobURL(
				process.env.AZURE_STORAGE_CONTAINER,
				rawBlobName
			);
			const stdDataURL = await dataService.getBlobURL(
				process.env.AZURE_STORAGE_CONTAINER_STD,
				stdBlobName
			);

			await dataService.updateDatasetBlobInfo(
				data.id,
				rawDataURL,
				rawBlobName,
				stdDataURL,
				stdBlobName
			);

			await dataService.updateDatasetWithBlobPrefix(
				data.id,
				country.name,
				`${dataService.getIdentifier(
					project
				)}/${dataService.getIdentifier(fieldsite)}`
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
	const fieldsiteId = req.body.fieldsite._id;
	const datapoints = await Datapoint.model
		.find({
			fieldsite: fieldsiteId,
		})
		.where("tsDate")
		.gte(startDate)
		.lt(endDate)
		.exec();

	if (!datapoints.length) {
		res.status(404).json({
			error: "Could not find any datapoints in the given date range",
		});
		return;
	}

	const { AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_QUEUE_ANALYZE } =
		process.env;

	const dataset = new Dataset.model({
		fieldsite: fieldsiteId,
		user: req.user._id,
		startDate,
		endDate,
	});

	const queueClient = QueueServiceClient.fromConnectionString(
		AZURE_STORAGE_CONNECTION_STRING
	).getQueueClient(AZURE_STORAGE_QUEUE_ANALYZE);
	const sendMessageResponse = await queueClient.sendMessage(
		Buffer.from(
			JSON.stringify({
				datasetId: dataset.id,
			})
		).toString("base64")
	);
	await dataset.save();

	res.send({ queue: sendMessageResponse });
};

exports.analyze2 = async function (req, res) {
	// get all rows within the time frame for the fieldsite
	const startDate = new Date(req.body.startDate);
	const endDate = new Date(req.body.endDate);
	endDate.setDate(endDate.getDate() + 1);
	const fieldsiteId = req.body.fieldsite._id;
	const datapoints = await Datapoint.model
		.find({
			fieldsite: fieldsiteId,
			active: true,
			type: DataTypes.STANDARDIZED,
		})
		.where("tsDate")
		.gte(startDate)
		.lt(endDate)
		.exec();

	if (!datapoints.length) {
		res.status(404).json({
			error: "Could not find any datapoints in the given date range",
		});
		return;
	}

	const fieldsite = await Fieldsite.model
		.findOne({ _id: fieldsiteId })
		.exec();

	let currDate = moment().format("YYYYMMDD");
	const dataset = new Dataset.model({
		name: req.body.name,
		description: req.body.description,
		dateOfReading: new Date(),
		fieldsite: fieldsiteId,
		user: req.user._id,
		archived: false,
	});
	const blobName = `${req.body.name}__${dataset.id.slice(-4)}__${
		fieldsite.name
	}__${currDate}__${req.body.duration}__${req.body.confidence}.csv`;

	// create CSV with standardized datapoints
	const blobResult = await dataService.createCsv(datapoints, blobName);
	let blobUrl;
	if (blobResult) {
		blobUrl = await dataService.getBlobURL(
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
	const fieldsiteId = req.body.fieldsite;
	const overwrite = req.body.overwrite;
	const userId = req.user._id;
	const {
		AZURE_STORAGE_CONTAINER,
		AZURE_STORAGE_CONNECTION_STRING,
		AZURE_STORAGE_QUEUE_STANDARDIZE,
	} = process.env;

	if (!req.files) {
		res.sendStatus(400);
		return;
	}

	const reqFiles = req.files["files[]"];
	const files = Array.isArray(reqFiles)
		? _.flattenDeep(reqFiles)
		: [reqFiles];

	const blobServiceClient = BlobServiceClient.fromConnectionString(
		AZURE_STORAGE_CONNECTION_STRING
	);
	const containerClient = blobServiceClient.getContainerClient(
		AZURE_STORAGE_CONTAINER
	);

	const upload = new Upload.model({
		user: userId,
		fieldsite: fieldsiteId,
		overwriting: overwrite,
		containerName: AZURE_STORAGE_CONTAINER,
	});

	const blobDirectoryName = upload.id;

	const uploadBlobResponses = [];

	await Promise.all(
		files.map(async (file, i) => {
			const blockBlobClient = containerClient.getBlockBlobClient(
				`${blobDirectoryName}/${i}_${file.originalname}`
			);
			const response = await blockBlobClient.uploadFile(file.path);
			uploadBlobResponses.push(response);
		})
	);

	const queueClient = QueueServiceClient.fromConnectionString(
		AZURE_STORAGE_CONNECTION_STRING
	).getQueueClient(AZURE_STORAGE_QUEUE_STANDARDIZE);
	const sendMessageResponse = await queueClient.sendMessage(
		Buffer.from(
			JSON.stringify({
				uploadId: upload.id,
			})
		).toString("base64")
	);
	await upload.save();

	res.json({ blobs: uploadBlobResponses, queue: sendMessageResponse });
};

exports.append2 = async function (req, res) {
	let files;
	const fieldsiteId = req.body.fieldsite;
	const userId = req.user._id;
	const overwrite = req.body.overwrite;

	if (!req.files) {
		res.sendStatus(400);
		return;
	}

	const reqFiles = req.files["files[]"];

	if (Array.isArray(reqFiles)) {
		files = _.flattenDeep(reqFiles);
	} else {
		files = [reqFiles];
	}

	res.json({
		uploaded_count: files.length,
	});

	await createUpload(userId, fieldsiteId, overwrite, files);
};

async function createUpload(userId, fieldsiteId, overwrite, files) {
	const upload = new Upload.model({
		user: userId,
		fieldsite: fieldsiteId,
	});

	let nDuplicates = 0;

	const nBefore = await Datapoint.model
		.count({
			fieldiste: fieldsiteId,
			active: true,
			type: DataTypes.STANDARDIZED,
		})
		.exec();

	const appendData = (dataRows, type) => {
		dataRows.forEach(async (row) => {
			nDuplicates += (await dataService.createDatapoint(
				row,
				fieldsiteId,
				upload.id,
				type,
				overwrite
			))
				? 0
				: 1;
		});
	};

	files.forEach(async (file) => {
		const ext = path.extname(file.originalname).substring(1);
		std.standardize(file.path, ext).then((data) => {
			Object.values(DataTypes).forEach((dataType) => {
				appendData(data[dataType], dataType);
			});
		});
	});

	upload.nBefore = nBefore;
	upload.nDuplicates = nDuplicates;

	upload.save();
}

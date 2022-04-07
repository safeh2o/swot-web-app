const archiver = require("archiver");
const azblob = require("@azure/storage-blob");
const dataService = require("../../utils/data.service");
const keystone = require("keystone");
const Dataset = keystone.list("Dataset");
const Datapoint = keystone.list("Datapoint");
const _ = require("lodash");
const { BlobServiceClient } = require("@azure/storage-blob");
const { QueueServiceClient } = require("@azure/storage-queue");
const Upload = keystone.list("Upload");

exports.analyze = async function (req, res) {
	// get all rows within the time frame for the fieldsite
	const startDate = new Date(req.body.startDate);
	const endDate = new Date(req.body.endDate);
	const confidenceLevel = req.body.confidence;
	const maxDuration = req.body.duration;
	endDate.setDate(endDate.getDate() + 1);
	const fieldsiteId = req.body.fieldsite._id;
	const datapoints = await Datapoint.model
		.count({
			fieldsite: fieldsiteId,
		})
		.where("tsDate")
		.gte(startDate)
		.lt(endDate)
		.exec();

	if (datapoints <= 0) {
		res.status(400).json({
			error: "Could not find any datapoints in the given date range",
		});
		return;
	}

	let dataset;

	if (req.body.startDate) {
		dataset = new Dataset.model({
			fieldsite: fieldsiteId,
			user: req.user._id,
			startDate,
			endDate,
			maxDuration,
			confidenceLevel,
			dateCreated: new Date(),
		});
	} else {
		dataset = new Dataset.model({
			fieldsite: fieldsiteId,
			user: req.user._id,
			startDate: null,
			endDate,
			maxDuration,
			confidenceLevel,
			dateCreated: new Date(),
		});
	}

	// const queueClient = QueueServiceClient.fromConnectionString(
	// 	AZURE_STORAGE_CONNECTION_STRING
	// ).getQueueClient(AZURE_STORAGE_QUEUE_ANALYZE);
	// const sendMessageResponse = await queueClient.sendMessage(
	// 	Buffer.from(
	// 		JSON.stringify({
	// 			datasetId: dataset.id,
	// 			maxDuration,
	// 			confidenceLevel,
	// 		})
	// 	).toString("base64")
	// );
	await dataset.save();
	const response = dataset.runAnalysis();

	res.send({ queue: response });
};

exports.append = async function (req, res) {
	const fieldsiteId = req.body.fieldsite;
	const overwrite = req.body.overwrite;
	const userId = req.user._id;
	const uploaderEmail = req.user.email;
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
	const sendMessageResponse = await queueClient
		.sendMessage(
			Buffer.from(
				JSON.stringify({
					uploadId: upload.id,
					uploaderEmail: uploaderEmail,
				})
			).toString("base64")
		)
		.catch(() => {
			res.status(501).send("Queue does not exist");
		});

	if (sendMessageResponse) {
		await upload.save();
		res.json({ blobs: uploadBlobResponses, queue: sendMessageResponse });
	}
};

exports.fetchRawData = async function (req, res) {
	const { uploadId } = req.query;

	const allowed =
		req.user &&
		(req.user.isAdmin ||
			(await dataService.isUserAllowedAccessToUpload(
				req.user._id,
				uploadId
			)));

	if (!allowed) {
		res.status(403).send("Insufficient Privilleges");
		return;
	} else if (!uploadId) {
		res.status(400).send("Invalid upload id");
		return;
	}

	const containerName = process.env.AZURE_STORAGE_CONTAINER;
	const prefix = uploadId;

	const containerClient = new azblob.ContainerClient(
		process.env.AZURE_STORAGE_CONNECTION_STRING,
		containerName
	);

	// set up archive
	const archive = archiver("zip");

	archive.on("error", function (err) {
		console.log(`Error during download operation`, err);
		res.send("Error occurred during download operation");
		return;
	});

	res.header("Content-Type", "application/zip");
	res.header("Content-Disposition", `attachment; filename="${uploadId}.zip"`);

	// pipe archive to response
	archive.pipe(res);

	// start loading archive with blobs
	for await (const blobItem of containerClient.listBlobsFlat({
		prefix,
		delimiter: "",
	})) {
		const blobName = blobItem.name;
		const blobClient = containerClient.getBlobClient(blobName);
		const blobData = await blobClient.download();
		archive.append(blobData.readableStreamBody, {
			name: blobName.split("/").slice(-1)[0],
		});
	}

	// close archive to send response
	archive.finalize(function (err, bytes) {
		if (err) {
			throw err;
		}

		console.log(
			`Prepared zip file for download in size of ${bytes} total bytes`
		);
	});
};

exports.fetchStdData = async function (req, res) {
	const { datasetId } = req.query;

	const allowed =
		req.user &&
		(req.user.isAdmin ||
			(await dataService.isUserAllowedAccessToDataset(
				req.user._id,
				datasetId
			)));

	if (!allowed) {
		res.status(403).send("Insufficient Privilleges");
		return;
	} else if (!datasetId) {
		res.status(400).send("Invalid dataset id");
		return;
	}

	const containerName = process.env.AZURE_STORAGE_CONTAINER_STD;
	const prefix = datasetId;

	const containerClient = new azblob.ContainerClient(
		process.env.AZURE_STORAGE_CONNECTION_STRING,
		containerName
	);

	res.header("Content-Type", "text/csv");
	res.header(
		"Content-Disposition",
		`attachment; filename="${datasetId}.csv"`
	);

	let standardFile = containerClient.listBlobsFlat({ prefix });
	standardFile = (await standardFile.next()).value;
	if (!standardFile) {
		console.error(`Could not find standard file for dataset ${datasetId}`);
		res.status(404).send();
		return;
	}

	const blobName = standardFile.name;
	const blobClient = containerClient.getBlobClient(blobName);
	const blobData = (await blobClient.download()).readableStreamBody;

	blobData.on("error", function (err) {
		console.log(`Error during download operation`, err);
		res.send("Error occurred during download operation");
		return;
	});

	blobData.pipe(res);
};

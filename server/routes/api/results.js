const keystone = require("keystone");
const Dataset = keystone.list("Dataset");
const dataService = require("../../utils/data.service");
const azblob = require("@azure/storage-blob");
const archiver = require("archiver");

exports.download = async function (req, res) {
	const { datasetId } = req.query;

	const allowed =
		req.user &&
		(await dataService.isUserAllowedAccessToDataset(
			req.user._id,
			datasetId
		));

	if (!allowed) {
		res.status(403).send("Insufficient Privilleges");
		return;
	} else if (!datasetId) {
		res.status(400).send("Invalid dataset id");
		return;
	}

	const containerName = process.env.AZURE_STORAGE_CONTAINER_RESULTS;
	const prefix = datasetId;

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
	res.header(
		"Content-Disposition",
		`attachment; filename="${datasetId}.zip"`
	);

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
			name: blobName.split("/").at(-1),
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

exports.analyze = async function (req, res) {
	const { datasetIds } = req.body;
	if (!datasetIds) {
		res.status(400).send("No dataset ids given");
		return;
	}
	if (!Array.isArray(datasetIds)) {
		res.status(400).send("Invalid dataset ids");
		return;
	}

	const datasets = await Dataset.model
		.find({ _id: { $in: datasetIds }, user: req.user._id })
		.exec();

	if (datasets.length == 0) {
		res.status(400).send("Unable to find datasets");
		return;
	} else {
		datasets.forEach((dataset) => {
			dataset.runAnalysis();
		});

		res.json(`Resent ${datasets.length} dataset(s) for analysis`);
	}
};

exports.analyzedataset = async function (req, res) {
	const { datasetId } = req.query;
	if (!datasetId) {
		res.status(400).send("No dataset id given");
		return;
	}

	const allowed =
		req.user &&
		dataService.isUserAllowedAccessToDataset(req.user._id, datasetId);

	if (!allowed) {
		res.status(403).send("Not allowed");
		return;
	}

	const dataset = await Dataset.model.findOne({ _id: datasetId });

	if (!dataset) {
		res.status(404).send("No dataset found");
		return;
	}

	dataset.runAnalysis();
	res.status(200).send(`Resent dataset with id ${datasetId} for analysis`);
};

exports.resolve = async function (req, res) {
	const { datasetId, filename } = req.query;
	const { AZURE_SAS } = process.env;
	res.header("AZURE-SAS", AZURE_SAS);
	res.redirect(`/storage/${datasetId}/${filename}`);
};

exports.dataset = async function (req, res) {
	if (!req.params.datasetId) {
		res.status(400).send("No dataset id given");
		return;
	}
	try {
		const dataset = await Dataset.model.find({ _id: req.params.datasetId });
		res.json({ dataset });
	} catch (ex) {
		res.status(500).send("Something happened getting dataset information");
	}
};

const keystone = require("keystone");
const Dataset = keystone.list("Dataset");
const Fieldsite = keystone.list("Fieldsite");
const dataService = require("../../utils/data.service");
const azblob = require("@azure/storage-blob");
const archiver = require("archiver");

exports.download = async function (req, res) {
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

exports.analyzeMultiple = async function (req, res) {
	const { datasetIds } = req.body;
	if (!datasetIds) {
		res.status(400).send("No dataset ids given");
		return;
	}
	if (!Array.isArray(datasetIds)) {
		res.status(400).send("Invalid dataset ids");
		return;
	}

	const datasets = await Dataset.model.find({ _id: { $in: datasetIds } });

	let allowed = Boolean(req.user);
	for (const dataset of datasets) {
		allowed =
			allowed &&
			(req.user.isAdmin ||
				(await dataService.isUserAllowedAccessToDataset(
					req.user._id,
					dataset._id
				)));
	}

	if (!allowed) {
		res.status(403).send(
			"User is not allowed access to one or more of the datasets given"
		);
		return;
	}

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

exports.analyzeSingle = async function (req, res) {
	const { datasetId } = req.query;
	if (!datasetId) {
		res.status(400).send("No dataset id given");
		return;
	}

	const allowed =
		req.user &&
		(req.user.isAdmin ||
			(await dataService.isUserAllowedAccessToDataset(
				req.user._id,
				datasetId
			)));

	if (!allowed) {
		res.status(403).send("Not allowed");
		return;
	}

	const dataset = await Dataset.model.findById(datasetId);

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
	const allowed =
		req.user &&
		(req.user.isAdmin ||
			(await dataService.isUserAllowedAccessToDataset(
				req.user._id,
				req.params.datasetId
			)));
	if (!allowed) {
		res.status(403).send("Not allowed to access dataset");
		return;
	}

	try {
		const dataset = await Dataset.model.findById(req.params.datasetId);
		const fieldsite = await Fieldsite.model.findById(dataset.fieldsite);
		const area = await dataService.getAreaByFieldsite(fieldsite.id);
		const country = await dataService.getCountryByArea(area.id);
		res.json({
			dataset,
			locationData: {
				fieldsiteName: fieldsite.name,
				areaName: area.name,
				countryName: country.name,
			},
		});
	} catch (ex) {
		console.error(ex);
		res.status(500).send("Something happened getting dataset information");
	}
};

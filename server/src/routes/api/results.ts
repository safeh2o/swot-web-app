import { ContainerClient } from "@azure/storage-blob";
import * as archiver from "archiver";
import * as keystone from "keystone";
import {
	getAreaByFieldsite,
	getCountryByArea,
	getCsvBlobAsJson,
	isUserAllowedAccessToDataset,
} from "../../utils/data.service";
const Dataset = keystone.list("Dataset");
const Fieldsite = keystone.list("Fieldsite");

class MissingModelError extends Error {
	constructor(modelName, modelId, relationshipModel?, relatedModelId?) {
		const message = relationshipModel
			? `Missing ${modelName} with a relation to ${relationshipModel} with ID ${relatedModelId}`
			: `Missing ${modelName} with ID ${modelId}`;
		super(message);
	}
}

export async function download(req, res) {
	const { datasetId } = req.query;

	const allowed =
		req.user &&
		(req.user.isAdmin || (await isUserAllowedAccessToDataset(req.user._id, datasetId)));

	if (!allowed) {
		res.status(403).send("Insufficient Privilleges");
		return;
	} else if (!datasetId) {
		res.status(400).send("Invalid dataset id");
		return;
	}

	const containerName = process.env.AZURE_STORAGE_CONTAINER_RESULTS;
	const prefix = datasetId;

	const containerClient = new ContainerClient(
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
	res.header("Content-Disposition", `attachment; filename="${datasetId}.zip"`);

	// pipe archive to response
	archive.pipe(res);

	// start loading archive with blobs
	for await (const blobItem of containerClient.listBlobsFlat({
		prefix,
	})) {
		const blobName = blobItem.name;
		const blobClient = containerClient.getBlobClient(blobName);
		const blobData = await blobClient.download();
		archive.append(blobData.readableStreamBody as NodeJS.ReadStream, {
			name: blobName.split("/").slice(-1)[0],
		});
	}

	// close archive to send response
	archive.finalize();
}

export async function analyzeMultiple(req, res) {
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
			(req.user.isAdmin || (await isUserAllowedAccessToDataset(req.user._id, dataset._id)));
	}

	if (!allowed) {
		res.status(403).send("User is not allowed access to one or more of the datasets given");
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
}

export async function analyzeSingle(req, res) {
	const { datasetId } = req.query;
	if (!datasetId) {
		res.status(400).send("No dataset id given");
		return;
	}

	const allowed =
		req.user &&
		(req.user.isAdmin || (await isUserAllowedAccessToDataset(req.user._id, datasetId)));

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
}

export async function resolve(req, res) {
	const { datasetId, filename } = req.query;
	const { AZURE_SAS } = process.env;
	res.header("AZURE-SAS", AZURE_SAS);
	res.redirect(`/storage/${datasetId}/${filename}`);
}

export async function dataset(req, res) {
	if (!req.params.datasetId) {
		res.status(400).send("No dataset id given");
		return;
	}
	const allowed =
		req.user &&
		(req.user.isAdmin ||
			(await isUserAllowedAccessToDataset(req.user._id, req.params.datasetId)));
	if (!allowed) {
		res.status(403).send("Not allowed to access dataset");
		return;
	}

	try {
		const dataset = await Dataset.model.findById(req.params.datasetId);
		if (!dataset) {
			throw new MissingModelError("Dataset", req.params.datasetId);
		}
		const fieldsite = await Fieldsite.model.findById(dataset.fieldsite);
		if (!fieldsite) {
			throw new MissingModelError("Fieldsite", dataset.fieldsite);
		}
		const area = await getAreaByFieldsite(fieldsite.id);
		if (!area) {
			throw new MissingModelError("Area", null, "Fieldsite", fieldsite.id);
		}
		const country = await getCountryByArea(area.id);
		if (!country) {
			throw new MissingModelError("Country", null, "Area", area.id);
		}
		const targetFigureBlobName = `${req.params.datasetId}/eo/targets_fig_series1_line.csv`;
		const targetFigureJson = await getCsvBlobAsJson(
			process.env.AZURE_STORAGE_CONTAINER_RESULTS,
			targetFigureBlobName
		);
		const decayFigureBlobName = `${req.params.datasetId}/eo/decay_fig_series1_line.csv`;
		const decayFigureJson = await getCsvBlobAsJson(
			process.env.AZURE_STORAGE_CONTAINER_RESULTS,
			decayFigureBlobName
		);
		res.json({
			dataset,
			locationData: {
				fieldsiteName: fieldsite.name,
				areaName: area.name,
				countryName: country.name,
			},
			targetFigureJson,
			decayFigureJson,
		});
	} catch (ex) {
		console.error(ex);
		res.status(500).send("Something happened getting dataset information");
	}
}

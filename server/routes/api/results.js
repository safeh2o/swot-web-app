const keystone = require("keystone");
const _ = require("lodash");
const Area = keystone.list("Area");
const Fieldsite = keystone.list("Fieldsite");
const Dataset = keystone.list("Dataset");
const dataService = require("../../utils/data.service");
const Country = keystone.list("Country");
const azure = require("azure-storage");
const archiver = require("archiver");
const std = require("../../utils/standardize");

exports.processed = async function (req, res) {
	await sendDatasets(false, req, res);
};

exports.archived = async function (req, res) {
	await sendDatasets(true, req, res);
};

exports.download = async function (req, res) {
	if (!req.query.datasetId) {
		res.status(400).send("Invalid dataset id");
		return;
	}

	let retryCount = 0;
	let processedDatasetArray = await fetchDatasets(
		req.query.archived === "true",
		req
	);
	while (retryCount <= 5 && processedDatasetArray.length == 0) {
		retryCount++;
		processedDatasetArray = await fetchDatasets(
			req.query.archived === "true",
			req
		);
	}

	const datasetToDownload = processedDatasetArray.filter(
		(d) => d.datasetId == req.query.datasetId
	);
	if (datasetToDownload.length == 0) {
		res.status(400).send("Unable to find dataset, please try again later.");
		return;
	}

	const archive = archiver("zip");

	archive.on("error", function (err) {
		console.log(`Error during download operation`, err);
		res.send("Error occurred during download operation");
		return;
	});

	res.header("Content-Type", "application/zip");
	const date = new Date(datasetToDownload[0].datasetDate);
	const fileDate = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;
	res.header(
		"Content-Disposition",
		`attachment; filename="${dataService.getIdentifierKeyValue(
			datasetToDownload[0].datasetName,
			fileDate
		)}.zip"`
	);

	archive.pipe(res);

	datasetToDownload[0].datasetArtifacts.forEach((artifactLink) => {
		//console.log('Processing ' + JSON.stringify(datasetToDownload[0]));
		const filename = artifactLink.substring(
			artifactLink.lastIndexOf("/") + 1
		);
		const containerName = `${dataService.getIdentifierKeyValue(
			datasetToDownload[0].countryName,
			datasetToDownload[0].countryId
		)}`;
		archive.append(std.getBlobReadStream(containerName, artifactLink), {
			name: filename,
		});
	});

	archive.finalize(function (err, bytes) {
		if (err) {
			throw err;
		}

		console.log(
			`Prepared zip file for download in size of ${bytes} total bytes`
		);
	});
};

exports.fetch = async function (req, res) {
	if (!req.query.datasetId) {
		res.status(400).send("Invalid dataset id");
		return;
	}

	if (!req.user || !req.user.isAdmin) {
		res.status(403).send("Insufficient Privilleges");
		return;
	}

	const dataset = await Dataset.model
		.findById(req.query.datasetId)
		.populate("fieldsite")
		.exec();
	const fieldsite = dataset.fieldsite;
	const area = await Area.model
		.findOne({ fieldsites: { $in: [fieldsite.id] } })
		.exec();
	const country = await Country.model
		.findOne({ areas: { $in: [area.id] } })
		.exec();

	const containerName = `${dataService.getIdentifier(country)}`;
	const prefix = `${dataService.getIdentifier(
		area
	)}/${dataService.getIdentifier(fieldsite)}/${dataset._id}`;

	let datasetArtifacts;

	const retryOperations = new azure.LinearRetryPolicyFilter();
	const blobService = azure.createBlobService().withFilter(retryOperations);

	blobService.listBlobsSegmentedWithPrefix(
		containerName,
		prefix,
		null,
		{
			delimiter: "",
			useNagleAlgorithm: true,
			maximumExecutionTimeInMs: 12000,
			clientRequestTimeoutInMs: 12000,
			timeoutIntervalInMs: 12000,
		},
		(err, data) => {
			if (err) {
				console.log(
					`Error occurred while reading blobs from Azure, container name is ${containerName}, prefix is ${prefix} and error is ${err}`
				);
				reject(err);
			}

			datasetArtifacts = data.entries.map((e) => e.name);

			const archive = archiver("zip");

			archive.on("error", function (err) {
				console.log(`Error during download operation`, err);
				res.send("Error occurred during download operation");
				return;
			});

			res.header("Content-Type", "application/zip");
			const date = new Date(dataset.dateOfReading);
			const fileDate = `${date.getFullYear()}-${
				date.getMonth() + 1
			}-${date.getDate()}`;
			res.header(
				"Content-Disposition",
				`attachment; filename="${dataService.getIdentifierKeyValue(
					dataset.name,
					fileDate
				)}.zip"`
			);

			archive.pipe(res);

			datasetArtifacts.forEach((artifactLink) => {
				//console.log('Processing ' + JSON.stringify(datasetToDownload[0]));
				const filename = artifactLink.substring(
					artifactLink.lastIndexOf("/") + 1
				);
				archive.append(
					std.getBlobReadStream(containerName, artifactLink),
					{ name: filename }
				);
			});

			archive.finalize(function (err, bytes) {
				if (err) {
					throw err;
				}

				console.log(
					`Prepared zip file for download in size of ${bytes} total bytes`
				);
			});
		}
	);
};

exports.archive = async function (req, res) {
	if (!req.query.datasetIds) {
		res.status(400).send("No dataset id given");
		return;
	}
	let datasetIds = [];
	try {
		datasetIds = JSON.parse(req.query.datasetIds).map((d) => d.toString());
	} catch (e) {
		res.status(400).send("Invalid dataset id");
		return;
	}

	const processedDatasets = await fetchDatasets(false, req);
	const processedDatasetIds = processedDatasets.map((d) => d.datasetId);
	const datasetToArchive = processedDatasetIds.filter(
		(d) => datasetIds.indexOf(d.toString()) !== -1
	);

	if (datasetToArchive.length == 0) {
		res.status(400).send("Unable to find datasets");
		return;
	} else {
		await dataService.archiveDatasets(datasetToArchive);
		res.json(datasetToArchive);
	}
};

exports.analyze = async function (req, res) {
	if (!req.body.datasetIds) {
		res.status(400).send("No dataset id given");
		return;
	}
	let datasetIds = req.body.datasetIds;
	if (!Array.isArray(datasetIds)) {
		res.status(400).send("Invalid dataset id");
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

exports.resolve = async function (req, res) {
	const { datasetId, filename } = req.query;
	const { AZURE_SAS } = process.env;
	res.header("AZURE-SAS", AZURE_SAS);
	res.redirect(`/storage/${datasetId}/${filename}`);
};

exports.datasets = async function (req, res) {
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

async function sendDatasets(archived, req, res) {
	let retryCount = 0;
	let userDatasets = await fetchDatasets(archived, req);
	// retry a few times since Azure blob storage sometimes returns empty results
	while (retryCount <= 5 && userDatasets.length == 0) {
		retryCount++;
		userDatasets = await fetchDatasets(archived, req);
	}
	res.json({ adminView: req.user.canAccessKeystone, datasets: userDatasets });
}

async function fetchDatasets(archived, req) {
	const processedDatasetArray = await getUserDatasets(req.user.id, archived);
	//console.log('Datasets', JSON.stringify(processedDatasetArray));
	if (processedDatasetArray && processedDatasetArray.length) {
		const processedDatasetArrayWithBlobs =
			await getAnalysisResultsFromBlobStorage(processedDatasetArray);
		//console.log('Blob Datasets', JSON.stringify(processedDatasetArrayWithBlobs));
		return processedDatasetArrayWithBlobs;
	} else {
		return [];
	}
}

/**
 * Return user's datasets from associated fieldsites through area relationship
 */
async function getUserDatasets(userId, archived) {
	return new Promise(async (resolve, reject) => {
		const areasWithFieldsites = await dataService.getAreasWithFieldsites(
			userId
		);

		if (areasWithFieldsites.length == 0) {
			resolve(null);
		}

		const result = [];

		for (let i = 0; i < areasWithFieldsites.length; i++) {
			const area = areasWithFieldsites[i];
			const country = await dataService.getCountryByArea(area._id);
			for (let j = 0; j < area.fieldsites.length; j++) {
				const fieldsite = area.fieldsites[j];
				const filter = { fieldsite: fieldsite.id, archived: archived };
				const datasets = await Dataset.model.find(filter).exec();
				if (datasets && datasets.length) {
					delete area.user;
					result.push(
						new ProcessedDataset(country, area, fieldsite, datasets)
					);
				}
			}
		}

		resolve(result);
	});
}

async function searchAzureStorage(
	containerName,
	prefix,
	processedDatasetItem,
	dataset
) {
	const retryOperations = new azure.LinearRetryPolicyFilter();
	const blobService = azure.createBlobService().withFilter(retryOperations);
	return new Promise((resolve, reject) => {
		blobService.listBlobsSegmentedWithPrefix(
			containerName,
			prefix,
			null,
			{
				delimiter: "",
				useNagleAlgorithm: true,
				maximumExecutionTimeInMs: 12000,
				clientRequestTimeoutInMs: 12000,
				timeoutIntervalInMs: 12000,
			},
			(err, data) => {
				if (err) {
					console.log(
						`Error occurred while reading blobs from Azure, container name is ${containerName}, prefix is ${prefix} and error is ${err}`
					);
					reject(err);
				}
				const viewModel = new ProcessedDatasetViewModel(
					processedDatasetItem.country.name,
					processedDatasetItem.country._id,
					processedDatasetItem.fieldsite.name,
					processedDatasetItem.fieldsite._id,
					processedDatasetItem.area.name,
					processedDatasetItem.area._id,
					dataset.name,
					dataset._id,
					dataset.description,
					dataset.dateOfReading,
					[],
					dataset.archived
				);

				if (data && data.entries && data.entries.length) {
					viewModel.datasetArtifacts = data.entries.map(
						(e) => e.name
					);
				}
				resolve(viewModel);
			}
		);
	});
}

async function getAnalysisResultsFromBlobStorage(processedDatasetArray) {
	return new Promise(async (resolve, reject) => {
		const result = [];
		for (
			let outerIndex = 0;
			outerIndex < processedDatasetArray.length;
			outerIndex++
		) {
			const processedDatasetItem = processedDatasetArray[outerIndex];

			if (
				processedDatasetItem.country &&
				processedDatasetItem.fieldsite &&
				processedDatasetItem.area
			) {
				for (
					let innerIndex = 0;
					innerIndex < processedDatasetItem.datasets.length;
					innerIndex++
				) {
					const dataset = processedDatasetItem.datasets[innerIndex];
					const containerName = `${dataService.getIdentifier(
						processedDatasetItem.country
					)}`;
					const prefix = `${dataService.getIdentifier(
						processedDatasetItem.area
					)}/${dataService.getIdentifier(
						processedDatasetItem.fieldsite
					)}/${dataset._id}`;
					console.log(
						`Searching Azure with container name  ${containerName} and prefix ${prefix}`
					);

					let azureBlob;
					try {
						azureBlob = await searchAzureStorage(
							containerName,
							prefix,
							processedDatasetItem,
							dataset
						);
					} catch (e) {
						console.log("Unable to read container from Azure", e);
						continue;
					}
					if (azureBlob.datasetId) {
						result.push(azureBlob);
					} else {
						reject(azureBlob);
					}
				}
			} else {
				console.log(
					"Warning: This area does not seem to have a country or fieldset assignment: ",
					processedDatasetItem
				);
			}
		}
		result.sort((a, b) => {
			return Date.parse(a.datasetDate) - Date.parse(b.datasetDate);
		});
		resolve(result);
	});
}

class ProcessedDataset {
	constructor(country, area, fieldsite, datasets) {
		this.country = country;
		this.area = area;
		this.fieldsite = fieldsite;
		this.datasets = datasets;
	}
}

class ProcessedDatasetViewModel {
	constructor(
		countryName,
		countryId,
		fieldsiteName,
		fieldsiteId,
		areaName,
		areaId,
		datasetName,
		datasetId,
		datasetDesc,
		datasetDate,
		datasetArtifacts,
		archived
	) {
		this.countryName = countryName;
		this.countryId = countryId;
		this.fieldsiteName = fieldsiteName;
		this.fieldsiteId = fieldsiteId;
		this.areaName = areaName;
		this.areaId = areaId;
		this.datasetName = datasetName;
		this.datasetId = datasetId;
		this.datasetDesc = datasetDesc;
		this.datasetDate = datasetDate;
		this.datasetArtifacts = datasetArtifacts;
		this.archived = archived;
	}
}

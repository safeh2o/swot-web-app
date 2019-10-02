const keystone = require('keystone');
const _ = require('lodash');
const Project = keystone.list('Project');
const Fieldsite = keystone.list('Fieldsite');
const Dataset = keystone.list('Dataset');
const dataService = require('../../utils/data.service');
const Country = keystone.list('Country');
const azure = require('azure-storage');
const archiver = require('archiver');

exports.processed = async function(req, res) {
  await sendDatasets(false, req, res);
}

exports.archived = async function(req, res) {
  await sendDatasets(true, req, res);
}

exports.download = async function(req, res) {
  if (!req.query.datasetId) {
    res.status(400).send('Invalid dataset id');
    return;
  }
  const processedDatasetArray = await fetchDatasets(req.query.archived, req);
  const datasetToDownload = processedDatasetArray.filter(d => d.datasetId == req.query.datasetId);
  if (datasetToDownload.length == 0) {
    res.status(400).send('Unable to find dataset');
    return;
  }

  const archive = archiver('zip');

  archive.on('error', function(err) {
    console.log(`Error during download operation`, err);
    res.send('Error occurred during download operation');
    return;
  });

  res.header('Content-Type', 'application/zip');
  const date = new Date(datasetToDownload[0].datasetDate);
  const fileDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  res.header('Content-Disposition', `attachment; filename="${dataService.getIdentifierKeyValue(datasetToDownload[0].datasetName, fileDate)}.zip"`);

  archive.pipe(res);

  datasetToDownload[0].datasetArtifacts.forEach((artifactLink) => {
    //console.log('Processing ' + JSON.stringify(datasetToDownload[0]));
    const filename = artifactLink.substring(artifactLink.lastIndexOf('/') + 1);
    const containerName = `${dataService.getIdentifierKeyValue(datasetToDownload[0].countryName, datasetToDownload[0].countryId)}`;
    archive.append(getBlobReadStream(containerName, artifactLink), { name: filename });
  });

  archive.finalize(function(err, bytes) {
    if (err) {
      throw err;
    }

    console.log(`Prepared zip file for download in size of ${bytes} total bytes`);
  });
  
}

exports.archive = async function(req, res) {
  if (!req.query.datasetIds) {
    res.status(400).send('No dataset id given');
    return;
  }
  let datasetIds = [];
  try {
    datasetIds = JSON.parse(req.query.datasetIds).map(d => d.toString());
  } catch (e) {
    res.status(400).send('Invalid dataset id');
    return;
  }

  const processedDatasets = await fetchDatasets(false, req);
  const processedDatasetIds = processedDatasets.map(d => d.datasetId);
  const datasetToArchive = processedDatasetIds.filter(d => datasetIds.indexOf(d.toString()) !== -1);

  if (datasetToArchive.length == 0) {
    res.status(400).send('Unable to find datasets');
    return;
  } else {
    await dataService.archiveDatasets(datasetToArchive);
    res.json(datasetToArchive);
  }
}


async function sendDatasets(archived, req, res) {
  const userDatasets = await fetchDatasets(archived, req);
  res.json(userDatasets)
}

async function fetchDatasets(archived, req) {
  const processedDatasetArray = await getUserDatasets(req.user.id, archived);
  //console.log('Datasets', JSON.stringify(processedDatasetArray));
  if (processedDatasetArray && processedDatasetArray.length) {
    const processedDatasetArrayWithBlobs = await getAnalysisResultsFromBlobStorage(processedDatasetArray);
    //console.log('Blob Datasets', JSON.stringify(processedDatasetArrayWithBlobs));
    return processedDatasetArrayWithBlobs;
  } else {
    return [];
  }
}

/**
 * Return user's datasets from associated fieldsites through project relationship
 */
async function getUserDatasets(userId, archived) {
  return new Promise(async (resolve, reject) => {
    
    const projectsHavingUser = await Project.model
      .find({ users: userId })
      .populate('users')
      .populate('fieldsites')
      .exec();

    if (!projectsHavingUser) {
      resolve(null);
    }

    const result = [];
    
    const projectsWithFieldsites = _.flatMap(projectsHavingUser, (p) => p);
    _.each(projectsWithFieldsites, async (project, outerIndex) => {
      //get country since it's the container name
      const country = await dataService.getCountryByProject(project._id); 
      _.each(project.fieldsites, async (fieldsite, innerIndex) => {
        const filter = {fieldsite: fieldsite._id, archived: false};
        if (archived) {
          filter.archived = true;
        }
        const datasets = await Dataset.model.find(filter).exec();
        
        if (datasets && datasets.length) {
          delete(project.user);
          result.push(new ProcessedDataset(country, project, fieldsite, datasets));
        }
        
        if ((outerIndex == projectsWithFieldsites.length -1) && (innerIndex == project.fieldsites.length - 1) ) {          
          resolve(result);
        }
      });      
    });
  });
}

function getBlobReadStream(containerName, blobName) {
  const blobService = azure.createBlobService();
  return blobService.createReadStream(containerName, blobName);
}

async function searchAzureStorage(containerName, prefix, processedDatasetItem, dataset) {
  const blobService = azure.createBlobService();
  return new Promise((resolve, reject) => {
    blobService.listBlobsSegmentedWithPrefix(containerName, prefix, null, { delimiter: "" }, (err, data) => {
      if (err) {
        console.log(`Error occurred while reading blobs from Azure, container name is ${containerName}, prefix is ${prefix} and error is ${err}`);
        reject(err);
      }
      const viewModel = new ProcessedDatasetViewModel(
        processedDatasetItem.country.name,
        processedDatasetItem.country._id,
        processedDatasetItem.fieldsite.name,
        processedDatasetItem.fieldsite._id,
        processedDatasetItem.project.name,
        processedDatasetItem.project._id,
        dataset.name,
        dataset._id,
        dataset.description,
        dataset.dateOfReading, [], dataset.archived
      );

      if (data && data.entries && data.entries.length) {
        viewModel.datasetArtifacts = data.entries.map(e => e.name);
      }
      resolve(viewModel);
    });
  });
}

async function getAnalysisResultsFromBlobStorage(processedDatasetArray) {
  return new Promise(async (resolve, reject) => {
    const result = [];
    for (let outerIndex = 0; outerIndex < processedDatasetArray.length; outerIndex++) {
      const processedDatasetItem = processedDatasetArray[outerIndex];

      if (processedDatasetItem.country && processedDatasetItem.fieldsite && processedDatasetItem.project) {
      
        for (let innerIndex = 0; innerIndex < processedDatasetItem.datasets.length; innerIndex++) {
          const dataset = processedDatasetItem.datasets[innerIndex];
          const containerName = `${dataService.getIdentifier(processedDatasetItem.country)}`;
          const prefix = `${dataService.getIdentifier(processedDatasetItem.project)}/${dataService.getIdentifier(processedDatasetItem.fieldsite)}/${dataset._id}`;
          console.log(`Searching Azure with container name  ${containerName} and prefix ${prefix}`);

          const azureBlob = await searchAzureStorage(containerName, prefix, processedDatasetItem, dataset);
          if (azureBlob.datasetId) {
            result.push(azureBlob);
          } else {
            reject(azureBlob);
          }
        }

      } else {
        console.log('Warning: This project does not seem to have a country or fieldset assignment: ', processedDatasetItem);
      }
    }
    result.sort((a,b) => {return a.datasetDate - b.datasetDate});
    resolve(result);
  });
}

class ProcessedDataset {
  constructor(country, project, fieldsite, datasets) {
    this.country = country;
    this.project = project;
    this.fieldsite = fieldsite;
    this.datasets = datasets;
  }
}

class ProcessedDatasetViewModel {
  constructor(countryName, countryId, fieldsiteName, fieldsiteId, projectName, projectId, datasetName, datasetId, datasetDesc, datasetDate, datasetArtifacts, archived) {
    this.countryName = countryName;
    this.countryId = countryId;
    this.fieldsiteName = fieldsiteName;
    this.fieldsiteId = fieldsiteId;
    this.projectName = projectName;
    this.projectId = projectId;
    this.datasetName = datasetName;
    this.datasetId = datasetId;
    this.datasetDesc = datasetDesc;
    this.datasetDate = datasetDate;
    this.datasetArtifacts = datasetArtifacts;
    this.archived = archived;
  }
}
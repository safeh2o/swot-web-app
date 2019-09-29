const keystone = require('keystone');
const _ = require('lodash');
const Project = keystone.list('Project');
const Fieldsite = keystone.list('Fieldsite');
const Dataset = keystone.list('Dataset');
const dataService = require('../../utils/data.service');
const Country = keystone.list('Country');
const azure = require('azure-storage');

exports.all = async function(req, res) {
  await sendDatasets(false, req, res);
}

exports.archived = async function(req, res) {
  await sendDatasets(true, req, res);
}

async function sendDatasets(archived, req, res) {
  const processedDatasetArray = await getUserDatasets(req.user.id, archived);
  //console.log('Datasets', JSON.stringify(processedDatasetArray));
  if (processedDatasetArray && processedDatasetArray.length) {
    const processedDatasetArrayWithBlobs = await getAnalysisResultsFromBlobStorage(processedDatasetArray);
    //console.log('Blob Datasets', JSON.stringify(processedDatasetArrayWithBlobs));
    res.json(processedDatasetArrayWithBlobs);
  } else {
    res.json([]);
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
        const filter = {fieldsite: fieldsite._id};
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

async function getAnalysisResultsFromBlobStorage(processedDatasetArray) {
  return new Promise(async (resolve, reject) => {
    const result = [];
    const blobService = azure.createBlobService();
    for (let outerIndex = 0; outerIndex < processedDatasetArray.length; outerIndex++) {
      const processedDatasetItem = processedDatasetArray[outerIndex];

      if (processedDatasetItem.country && processedDatasetItem.fieldsite && processedDatasetItem.project) {
      
        for (let innerIndex = 0; innerIndex < processedDatasetItem.datasets.length; innerIndex++) {
          const dataset = processedDatasetItem.datasets[innerIndex];
          const containerName = `${dataService.getIdentifier(processedDatasetItem.country)}`;
          const prefix = `${dataService.getIdentifier(processedDatasetItem.project)}/${dataService.getIdentifier(processedDatasetItem.fieldsite)}/${dataset._id}`;
          console.log(`Container name is ${containerName} and prefix is ${prefix}`);
          blobService.listBlobsSegmentedWithPrefix(containerName, prefix, null, { delimiter: "" }, (err, data) => {
              if (err) {
                console.log(`Error occurred while reading blobs from Azure, container name is ${containerName}, prefix is ${prefix} and error is ${err}`);
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
              result.push(viewModel);
              if ((outerIndex === processedDatasetArray.length -1) && (innerIndex === processedDatasetItem.datasets.length -1)) {
                resolve(result);
              }
            });
        }

      } else {
        console.log('Warning: This project does not seem to have a country or fieldset assignment: ', processedDatasetItem);
      }
    }
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
const keystone = require('keystone');
const mongoose = require('mongoose');
const Dataset = keystone.list('Dataset');
const Project = keystone.list('Project');
const Fieldsite = keystone.list('Fieldsite');
const Country = keystone.list('Country');
const _ = require('lodash');
const mailer = require('../../utils/emailer');
const analyzer = require('../../utils/analyzer');
const dataService = require('../../utils/data.service');
const std = require('../../utils/standardize');
const azure = require('azure-storage');
const path = require('path');

/**
 * Upload a new Dataset file
 */
exports.create = async function(req, res) {

  const dataset = new Dataset.model();

  dataset.getUpdateHandler(req).process(req.files, async function(err) {

    if (err) { 
      mailer.emailAdmin(`Error occurred during dataset upload for user ${req.user.first} ${req.user.last}`);
      return res.apiError('Unable to create dataset, please try again', err);
    }

    const userFieldsites = await getUserFieldsites(req.user._id);

    const standardizationError = await std.standardize(dataset.id, dataset.file.filename);

    if (standardizationError) {
      res.apiError('Standardization error: ' + standardizationError);
      return;
    } else {
      if (userFieldsites) {
        res.apiResponse({
          uploadedFile: dataset,
          fieldsites: userFieldsites
        });
      } else {
        mailer.emailAdmin(`User ${req.user.first} ${req.user.last} is not assigned to a fieldsite yet, and tried to upload a dataset.`);
        res.apiError('User is not assigned to a fieldsite.');
      }
    }
  });
}

/**
 * Update File by ID
 */
exports.update = async function(req, res) {
  Dataset.model.findById(req.params.id).exec(function(err, dataItem) {
    if (err) {
      mailer.emailAdmin(`An invalid dataset id was provided to upload page controller. ID is ${req.params.id} and user is ${req.user.first} ${req.user.last}`);
      return res.apiError('An unknown database error occurred', err);
    }

    if (!dataItem) return res.apiError('Dataset was not uploaded, please try again');

    const data = (req.method == 'POST') ? req.body : req.query;

    dataItem.getUpdateHandler(req).process(data, async function(err) {

      if (err) return res.apiError('Dataset was not updated with fieldsite, please try uploading again', err);


      await associateDatasetWithUser(req.user._id, dataItem._id);

      await associateDatasetWithFieldsite(data.fieldsite, dataItem._id);
      
      const project = await dataService.getProjectByFieldsite(data.fieldsite);
      const country = await dataService.getCountryByProject(project._id);      
      const fieldsite = await dataService.getFieldsiteById(data.fieldsite);
      
      const originalFileExtension = path.extname(dataItem.file.filename);
      const originalFileWithoutExtension = dataItem.file.filename.replace(originalFileExtension, "");
      const targetBlobName = `${dataService.sanitizeStr(data.name)}__${dataService.sanitizeStr(originalFileWithoutExtension.slice(originalFileWithoutExtension.length -4))}__${dataService.sanitizeStr(fieldsite.name)}__${dataService.sanitizeStr(data.dateOfReading)}__${dataService.sanitizeStr(data.maxDurationHours)}__${dataService.sanitizeStr(data.confidenceLevel)}`;
      const stdBlobName = targetBlobName + ".csv";
      const rawBlobName = targetBlobName + originalFileExtension;

      await renameBlobFile(dataItem.file.url, rawBlobName, process.env.AZURE_STORAGE_CONTAINER);

      if (process.env.STANDARDIZE_DATASET == 1) {
        await renameBlobFile(dataItem.file.url.replace(process.env.AZURE_STORAGE_CONTAINER, process.env.AZURE_STORAGE_CONTAINER_STD).replace(originalFileExtension, ".csv"), 
          stdBlobName,
          process.env.AZURE_STORAGE_CONTAINER_STD);
      }

      const rawDataURL = await getBlobURL(process.env.AZURE_STORAGE_CONTAINER, rawBlobName);
      const stdDataURL = await getBlobURL(process.env.AZURE_STORAGE_CONTAINER_STD, stdBlobName);

      await updateDatasetBlobInfo(data.id, rawDataURL, stdDataURL, stdBlobName);

      await updateDatasetWithBlobPrefix(data.id, country.name, `${dataService.getIdentifier(project)}/${dataService.getIdentifier(fieldsite)}`)
      
      await analyzer.notifyFileUpload(stdBlobName, req.user.email, country, project, fieldsite, req.user, dataItem);

      res.apiResponse({
        file: dataItem
      });
    });
  });
}

async function getBlobURL(containerName, blobName) {
  const retryOperations = new azure.LinearRetryPolicyFilter();
  const blobService = azure.createBlobService().withFilter(retryOperations);
  return new Promise((resolve, reject) => {
    const url = blobService.getUrl(containerName, blobName)
    resolve(url);
  });
}

async function renameBlobFile(sourceURI, targetBlobName, containerName) {
  const retryOperations = new azure.LinearRetryPolicyFilter();
  const blobService = azure.createBlobService().withFilter(retryOperations);
  return new Promise((resolve, reject) => {
    blobService.startCopyBlob(sourceURI, containerName, targetBlobName, (err, _result) => {
      if (err) {
        console.log(`Error occurred while renaming blobs on Azure, container name is ${containerName}, source is ${sourceURI}, target is ${targetBlobName} and error is ${err}`);
        reject(err);
      }
      
      const srcBlobName = sourceURI.substring(sourceURI.lastIndexOf('/')+1)
      blobService.deleteBlob(containerName, srcBlobName, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      })
      
    });
  });
}

async function updateDatasetBlobInfo(datasetId, rawDataURL, stdDataURL, stdBlobName) {
  const setQuery = {
    'file.url': rawDataURL,
    'stdFile.url': stdDataURL,
    'stdFile.filename': stdBlobName
  };
  return Dataset.model.findOneAndUpdate({_id: datasetId}, { $set: setQuery}, { strict: false }).exec();
}

async function updateDatasetWithBlobPrefix(datasetId, containerName, prefix) {
  return Dataset.model.findOneAndUpdate({_id: datasetId}, { $set: {analysisContainer: containerName, analysisBlobPrefix: prefix, archived: false }}).exec();
}

/**
 * Update dataset record with current user's ID
 */
async function associateDatasetWithUser(userId, datasetId) {
  return Dataset.model.findOneAndUpdate({_id: datasetId}, { $set: {user: mongoose.Types.ObjectId(userId) }}).exec();
}

/**
 * Update dataset record with selected fieldsite ID
 */
async function associateDatasetWithFieldsite(fieldsiteIdStr, datasetId) {
    return Dataset.model.findOneAndUpdate({_id: datasetId}, { $set: {fieldsite: mongoose.Types.ObjectId(fieldsiteIdStr) }}).exec();    
}

/**
 * Return user's associated fieldsites from project relationship
 */
async function getUserFieldsites(userId) {
  const projectsHavingUser = await Project.model
    .find({ users: userId })
    .populate('users')
    .populate('fieldsites')
    .exec();

  if (!projectsHavingUser) {
    return null;
  }

  const fieldSites = _.flatMap(projectsHavingUser, (p) => p.fieldsites);
  return _.sortBy(fieldSites, f => f.name);
}

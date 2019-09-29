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

    if (userFieldsites) {
      res.apiResponse({
        uploadedFile: dataset,
        fieldsites: userFieldsites
      });
    } else {
      mailer.emailAdmin(`User ${req.user.first} ${req.user.last} is not assigned to a fieldsite yet, and tried to upload a dataset.`);
      res.apiError('User is not assigned to a fieldsite.');
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

      await associateDatasetWithUser(req.user._id, dataItem._id);

      await associateDatasetWithFieldsite(data.fieldsite, dataItem._id);
      
      if (err) return res.apiError('Dataset was not updated with fieldsite, please try uploading again', err);

      const project = await dataService.getProjectByFieldsite(data.fieldsite);
      const country = await dataService.getCountryByProject(project._id);      
      const fieldsite = await dataService.getFieldsiteById(data.fieldsite);
      await updateDatasetWithBlobPrefix(data._id, country.name, `${dataService.getIdentifier(project)}/${dataService.getIdentifier(fieldsite)}`)
      await analyzer.notifyFileUpload(dataItem.file.filename, req.user.email, country, project, fieldsite, req.user, dataItem);

      res.apiResponse({
        file: dataItem
      });
    });
  });
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

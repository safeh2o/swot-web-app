const keystone = require('keystone');
const Country = keystone.list('Country');
const Project = keystone.list('Project');
const Fieldsite = keystone.list('Fieldsite');
const mongoose = require('mongoose');
const Dataset = keystone.list('Dataset');
const _ = require('lodash');

/**
 * Retrieves a fieldsite record by it's id
 */
exports.getFieldsiteById = async function (fieldsiteId) {
  return Fieldsite.model.findById(fieldsiteId).exec();
}

/**
 * Retrieves a country record where project is associated
 */
exports.getCountryByProject = async function (projectId) {
  return Country.model.findOne({ projects:  mongoose.Types.ObjectId(projectId)}).exec();
}

/**
 * Retrieves a project record where field is associated
 */
exports.getProjectByFieldsite = async function (fieldSiteId) {
  return Project.model.findOne({ fieldsites: fieldSiteId}).exec();
}

exports.getIdentifier = function(dataItem) {
  if (!dataItem || !dataItem.name || !dataItem._id) {
    throw 'Incorrect dataitem passed - can not produce name/id of ' + dataItem;
  }
  return `${(dataItem.name).replace(/[^0-9a-z]/gi, '').toLowerCase()}-${dataItem._id}`;
}

exports.sanitizeStr = function(str) {
  return `${str.replace(/[^0-9a-z]/gi, '')}`;
}

exports.getIdentifierKeyValue = function(name, id) {
  if (!name || !id) {
    throw 'Incorrect dataitem passed - can not produce name/id of ' + name + ' ' + id;
  }
  return `${name.replace(/[^0-9a-z]/gi, '').toLowerCase()}-${id}`;
}

exports.archiveDatasets = async function(datasetIds) {
  await datasetIds.forEach(async (datasetId) =>  {
    console.log(`Archiving dataset ${datasetId}`);
    await Dataset.model.findOneAndUpdate({_id: datasetId}, { $set: {archived: true }}).exec();
  })
}

const getProjectsWithFieldsites = async function(userId) {
  return Project.model
      .find({ users: userId, fieldsites: {$ne: []} })
      .populate('users')
      .populate('fieldsites')
      .exec();
}

exports.getUserFieldsites = async function(userId) {
  return new Promise(async (resolve, reject) => {
    const projects = await getProjectsWithFieldsites(userId);
    const fieldsites = _.flatMap(projects, (project) => project.fieldsites);

    if (!fieldsites.length) {
      reject(null);
    }

    else {
      resolve(fieldsites);
    }
    
  });
}

exports.getProjectsWithFieldsites = getProjectsWithFieldsites;

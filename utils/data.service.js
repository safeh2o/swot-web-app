const keystone = require('keystone');
const Country = keystone.list('Country');
const Project = keystone.list('Project');
const Fieldsite = keystone.list('Fieldsite');
const mongoose = require('mongoose');

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
  return `${dataItem.name.replace(/[^0-9a-z]/gi, '').toLowerCase()}-${dataItem._id}`;
}
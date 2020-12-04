const moment = require('moment');
const azure = require('azure-storage');
const keystone = require('keystone');
const Country = keystone.list('Country');
const Project = keystone.list('Project');
const Fieldsite = keystone.list('Fieldsite');
const mongoose = require('mongoose');
const Dataset = keystone.list('Dataset');
const Datapoint = keystone.list('Datapoint');
const _ = require('lodash');
const DataTypes = require('./enums').DataTypes;

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
  return Country.model.findOne({ projects: mongoose.Types.ObjectId(projectId) }).exec();
}

/**
 * Retrieves a project record where field is associated
 */
exports.getProjectByFieldsite = async function (fieldSiteId) {
  return Project.model.findOne({ fieldsites: fieldSiteId }).exec();
}

exports.getIdentifier = function (dataItem) {
  if (!dataItem || !dataItem.name || !dataItem._id) {
    throw 'Incorrect dataitem passed - can not produce name/id of ' + dataItem;
  }
  return `${(dataItem.name).replace(/[^0-9a-z]/gi, '').toLowerCase()}-${dataItem._id}`;
}

exports.sanitizeStr = function (str) {
  return `${str.replace(/[^0-9a-z]/gi, '')}`;
}

exports.getIdentifierKeyValue = function (name, id) {
  if (!name || !id) {
    throw 'Incorrect dataitem passed - can not produce name/id of ' + name + ' ' + id;
  }
  return `${name.replace(/[^0-9a-z]/gi, '').toLowerCase()}-${id}`;
}

exports.archiveDatasets = async function (datasetIds) {
  await datasetIds.forEach(async (datasetId) => {
    console.log(`Archiving dataset ${datasetId}`);
    await Dataset.model.findOneAndUpdate({ _id: datasetId }, { $set: { archived: true } }).exec();
  })
}

exports.getProjectsWithFieldsites = async function getProjectsWithFieldsites(userId) {
  return Project.model
    .find({ users: userId, fieldsites: { $ne: [] } })
    .populate('users')
    .populate('fieldsites')
    .exec();
}

/**
 * Return user's associated fieldsites from project relationship
 */
exports.getUserFieldsites = async function (userId) {
  const projectsHavingUser = await Project.model
    .find({ users: userId })
    .populate('users')
    .populate('fieldsites')
    .exec();

  if (!projectsHavingUser) {
    return null;
  }

  let fieldsites = [];

  for (let i = 0; i < projectsHavingUser.length; i++) {
    prj = projectsHavingUser[i];
    const countriesHavingProject = await Country.model
      .find({ projects: prj })
      .exec();

    if (countriesHavingProject.length) {
      fieldsites = fieldsites.concat(prj.fieldsites);
    }
  }

  return _.sortBy(fieldsites, f => f.name);
}

exports.createDatapoint = async function createDatapoint(rowObj, fieldsiteId, attachmendId, type = null, overwrite = false) {
  
  const datapoint = {
    tsDate: rowObj.ts_datetime,
    hhDate: rowObj.hh_datetime,
    tsFrc: rowObj.ts_frc,
    hhFrc: rowObj.hh_frc,
    tsCond: rowObj.ts_cond,
    tsTemp: rowObj.ts_wattemp,
  };

  if (type == DataTypes.STANDARDIZED) {
    let duplicatePoints = await Datapoint.model.find({ fieldsite: fieldsiteId, tsDate: rowObj.ts_datetime, hhDate: rowObj.hh_datetime }).exec();

    if (duplicatePoints.length) {
      if (!overwrite) {
        return null;
      } else {
        duplicatePoints.forEach((existing) => {
          existing.set({active: false});
          existing.save();
        })
      }
    }
  }

  const datapointModel = new Datapoint.model({
    ...datapoint,
    attachment: attachmendId,
    fieldsite: fieldsiteId
  });

  if (type) {
    datapointModel.type = type;
  }

  datapointModel.save();

  return datapointModel;
}

exports.createCsv = async function(datapoints, blobName) {
  const dateFormat = process.env.DATE_FORMAT;

  let text = "ts_datetime,ts_frc,hh_datetime,hh_frc,ts_cond,ts_wattemp\n";
  datapoints.forEach(async (row) => {
    text += [moment(row.tsDate).format(dateFormat), row.tsFrc, moment(row.hhDate).format(dateFormat), row.hhFrc, row.tsCond, row.tsTemp].join(',') + '\n';
  });
  
  
  // return blob URL from Azure
  return await writeTextToBlob(process.env.AZURE_STORAGE_CONTAINER_STD, blobName, text);
}

async function writeTextToBlob(containerName, blobName, text) {
  const retryOperations = new azure.LinearRetryPolicyFilter();
  const blobService = azure.createBlobService().withFilter(retryOperations);
  return new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(containerName, null, function (error) {
      if (!error) {
        blobService.createBlockBlobFromText(containerName, blobName, text, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      } else reject(error);
    });
  });
}

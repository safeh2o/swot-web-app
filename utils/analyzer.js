const mailer = require('../utils/emailer');
const http = require('http');
const https = require('https');
const client = process.env.ANALYZER_URL.startsWith("http://") ? http : https;
const dataService = require('./data.service');

/**
 * Call Analyzer Node application to notify about dataset upload
 */
exports.notifyFileUpload = async function (filename, recipientEmail, country, project, fieldsite, user, dataset) {
  console.log(`Notifying analyzer for country/project/fieldsite/filename/dataset=${dataService.getIdentifier(country)}/${dataService.getIdentifier(project)}/${dataService.getIdentifier(fieldsite)}/${filename}/${dataset.id} uploaded by ${recipientEmail}`); 
  return client.get(`${process.env.ANALYZER_URL}/analysis?filename=${filename}&recipient=${recipientEmail}&country=${dataService.getIdentifier(country)}&project=${dataService.getIdentifier(project)}&fieldsite=${dataService.getIdentifier(fieldsite)}&dataset=${dataset.id}`)
    .on('error', function(e) {
        console.log("Error while communicating with analyzer: " + e.message);
        mailer.emailAdmin(`An error occurred while notifying the analyzer application. Error message is ${e}. User is ${user.first} ${user.last}, country is ${country}, project is ${project} and dataset is ${dataset}`);
    });
}


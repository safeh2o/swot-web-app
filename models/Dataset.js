var filenameUtils = require('../utils/filename');
var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * User Model
 * ==========
 */
var Dataset = new keystone.List('Dataset', { strict: false });

var azureStorage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-azure'),
  azure: {
    generateFilename: filenameUtils.swotAnalysisFilenameGenerator, 
  },
  schema: {
    container: true, // optional; store the referenced container in the database
    etag: true, // optional; store the etag for the resource
    url: true, // optional; generate & store a public URL
  },
});

Dataset.add({
    name: { type: Types.Text, index: true },
    description: { type: Types.Textarea, initial: true, index: true },
    dateOfReading: { type: Types.Date, initial: true, index: true },
    fieldsite: { type: Types.Relationship, ref: 'Fieldsite', initial: true, index: true },
    user: { type: Types.Relationship, ref: 'User', initial: true, index: true },
    file: { type: Types.File, storage: azureStorage, label: 'Raw Data' },
    stdFile: { type: Types.File, storage: azureStorage, label: 'Standardized Data' },
    createdTimeStamp: { type: Date, default: Date.now },
    archived: {type: Types.Boolean, index: true, default: false},
    }, 'Redo Analysis', {
    redo: { type: Types.Boolean, initial: false, default: false, label: 'Redo Analysis on Save' }
});

Dataset.schema.pre('save', function (next) {
  if (this.redo) {
    this.redo = false;
    this.redoAnalysis();
  }
  next();
});

Dataset.schema.methods.redoAnalysis = async function(callback) {
  
  const analyzer = require('../utils/analyzer');
  const dataService = require('../utils/data.service');

  const project = await dataService.getProjectByFieldsite(this.fieldsite.toString());
  const country = await dataService.getCountryByProject(project.id);
  const populated = await this.populate('user fieldsite').execPopulate();
  let filename;
  if (!this.stdFile || !this.stdFile.filename) {
    console.log('This dataset is old, parsing old URL...');
    filename = this.file.url.substring(this.file.url.lastIndexOf('/')+1);
    filename = filename.substring(0, filename.lastIndexOf('.')) + '.csv';
  } else {
    filename = this.stdFile.filename;
  }
  analyzer.notifyFileUpload(filename, populated.user.email, country, project, populated.fieldsite, this.user.toString(), this);
}

/**
 * Registration
 */
Dataset.defaultColumns = 'name, description, dateOfReading, fieldsite, user';

Dataset.register();

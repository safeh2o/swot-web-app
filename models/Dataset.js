var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Dataset = new keystone.List('Dataset');

var azureStorage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-azure'),
  azure: {
    generateFilename: keystone.Storage.randomFilename, // default
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
  file: { type: Types.File, storage: azureStorage },
  createdTimeStamp: { type: Date, default: Date.now },
  archived: {type: Types.Boolean, index: true, default: false}
});

/**
 * Registration
 */
Dataset.defaultColumns = 'name, description, dateOfReading, fieldsite, user';

Dataset.register();

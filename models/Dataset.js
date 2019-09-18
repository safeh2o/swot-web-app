var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Dataset = new keystone.List('Dataset');

Dataset.add({
  name: { type: Types.Text, required: true, index: true },
  description: { type: Types.Textarea, required: true, initial: true, index: true },
  dateOfReading: { type: Types.Date, required: true, initial: true, index: true },
  fieldsite: { type: Types.Relationship, ref: 'Fieldsite', initial: true, index: true },
  user: { type: Types.Relationship, ref: 'User', initial: true, index: true }
});

/**
 * Registration
 */
Dataset.defaultColumns = 'name, description, dateOfReading, fieldsite, user';
Dataset.register();

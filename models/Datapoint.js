var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Campsite Model
 * ==========
 */
var Datapoint = new keystone.List('Datapoint', {label: "Data Point"});

Datapoint.add({
  tsDate: { type: Types.Datetime, required: true, index: true, initial: false },
  hhDate: { type: Types.Datetime, required: false, index: false },
  tsFrc: { type: Types.Number, required: false, index: false },
  hhFrc: { type: Types.Number, required: false, index: false },
  tsCond: { type: Types.Number, required: false, index: false },
  tsTemp: { type: Types.Number, required: false, index: false },

  fieldsite: { type: Types.Relationship, ref: 'Fieldsite', index: true }
});

/**
 * Relationships
 */
Datapoint.relationship({ ref: 'Fieldsite', path: 'fieldsite', refPath: 'fieldsites' });
Datapoint.relationship({ ref: 'Dataset', path: 'datasets', refPath: 'datasets' });


/**
 * Registration
 */
// Datapoint.defaultColumns = 'name';
Datapoint.register();

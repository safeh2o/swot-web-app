var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Country Model
 * ==========
 */

var Country = new keystone.List('Country');

Country.add({
	name: { type: String, required: true, index: true },
	projects: { type: Types.Relationship, ref: 'Project', many: true },
});


Country.defaultColumns = 'name';
Country.register();

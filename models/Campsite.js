var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Campsite Model
 * ==========
 */
var Campsite = new keystone.List('Campsite');

Campsite.add({
	name: { type: Types.Text, required: true, index: true },
});

/**
 * Relationships
 */
Campsite.relationship({ ref: 'User', path: 'users', refPath: 'campsite' });


/**
 * Registration
 */
Campsite.defaultColumns = 'name';
Campsite.register();

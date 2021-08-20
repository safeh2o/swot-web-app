var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Country Model
 * ==========
 */

var Country = new keystone.List("Country");

Country.add({
	name: { type: String, required: true, index: true },
	areas: { type: Types.Relationship, ref: "Area", many: true },
});

// Country.relationship({ref: "User", path: "user", refPath: "managedCountries"});

Country.defaultColumns = "name";
Country.register();

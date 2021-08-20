var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Campsite Model
 * ==========
 */
var Fieldsite = new keystone.List("Fieldsite", { label: "Field Site" });

Fieldsite.add({
	name: { type: Types.Text, required: true, index: true },
});

/**
 * Relationships
 */
Fieldsite.relationship({
	ref: "Area",
	path: "area",
	refPath: "fieldsites",
});
Fieldsite.relationship({
	ref: "Dataset",
	path: "datasets",
	refPath: "fieldsite",
});

// Fieldsite.relationship({ref: "User", path: "user", refPath: "managedSites"});

/**
 * Registration
 */
Fieldsite.defaultColumns = "name";
Fieldsite.register();

var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Area Model
 * ==========
 */

var Area = new keystone.List("Area");

Area.add({
	name: { type: String, required: true, index: true },
	users: { type: Types.Relationship, ref: "User", many: true },
	fieldsites: { type: Types.Relationship, ref: "Fieldsite", many: true },
	admins: { type: Types.Relationship, ref: "User", many: true },
});

Area.relationship({ ref: "Country", path: "country", refPath: "areas" });

Area.defaultColumns = "name";
Area.register();
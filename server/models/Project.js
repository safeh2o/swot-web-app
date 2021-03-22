var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List("Project");

Project.add({
	name: { type: String, required: true, index: true },
	users: { type: Types.Relationship, ref: "User", many: true },
	fieldsites: { type: Types.Relationship, ref: "Fieldsite", many: true },
	// country: { type: Types.Relationship, ref: 'Country' },
});

//Project.relationship({ ref: 'Fieldsite', path: 'fieldsites', refPath: 'project' });
//Project.relationship({ ref: 'User', path: 'users', refPath: 'project' });
// Project.relationship({ref: "User", path: "user", refPath: "managedProjects"});
Project.relationship({ ref: "Country", path: "country", refPath: "projects" });

Project.defaultColumns = "name";
Project.register();

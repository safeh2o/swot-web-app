import * as keystone from "keystone";
const Types = keystone.Field.Types;

/**
 * Country Model
 * ==========
 */

const Country = new keystone.List("Country");

Country.add({
	name: { type: String, required: true, index: true },
	areas: { type: Types.Relationship, ref: "Area", many: true },
	admins: { type: Types.Relationship, ref: "User", many: true },
});

Country.defaultColumns = "name";
Country.register();

export type CountryType = {
	name: string;
	areas: string[];
	admins: string[];
	_id: string;
};

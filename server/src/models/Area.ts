import * as keystone from "keystone";
import { ModelService } from "./ModelService";
const Types = keystone.Field.Types;

/**
 * Area Model
 * ==========
 */

const Area = new keystone.List("Area");

Area.add({
	name: { type: String, required: true, index: true },
	users: { type: Types.Relationship, ref: "User", many: true },
	fieldsites: { type: Types.Relationship, ref: "Fieldsite", many: true },
	admins: { type: Types.Relationship, ref: "User", many: true },
});

Area.relationship({ ref: "Country", path: "country", refPath: "areas" });

Area.defaultColumns = "name";
Area.register();

export type AreaType = {
	name: string;
	users: string[];
	fieldsites: string[];
	admins: string[];
	_id: string;
};

export const AreaService = new ModelService<AreaType>(Area);

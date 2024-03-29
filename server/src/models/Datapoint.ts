import * as keystone from "keystone";
const Types = keystone.Field.Types;

/**
 * Datapoint Model
 * ==========
 */
const Datapoint = new keystone.List("Datapoint", { label: "Data Point" });

const dateFormat = process.env.DATE_FORMAT;

Datapoint.add({
	tsDate: {
		type: Types.Datetime,
		required: false,
		index: true,
		format: dateFormat,
		label: "Date at Tapstand",
		initial: true,
		utc: true,
	},
	hhDate: {
		type: Types.Datetime,
		required: false,
		index: true,
		format: dateFormat,
		label: "Date at Household",
		initial: true,
		utc: true,
	},
	tsFrc: {
		type: Types.Number,
		required: false,
		index: false,
		label: "Tapstand FRC",
		initial: true,
	},
	hhFrc: {
		type: Types.Number,
		required: false,
		index: false,
		label: "Household FRC",
		initial: true,
	},
	tsCond: {
		type: Types.Number,
		required: false,
		index: false,
		label: "Conductivity at Tapstand",
		initial: true,
	},
	tsTemp: {
		type: Types.Number,
		required: false,
		index: false,
		label: "Temperature at Tapstand",
		initial: true,
	},
	upload: {
		type: Types.Relationship,
		ref: "Upload",
		index: true,
		initial: true,
	},
	fieldsite: {
		type: Types.Relationship,
		ref: "Fieldsite",
		index: true,
		initial: true,
	},
});

/**
 * Relationships
 */
// Datapoint.relationship({ ref: 'Dataset', path: 'datapoints', refPath: 'datasets' });

/**
 * Registration
 */
Datapoint.defaultColumns = Object.keys(Datapoint.fields);
Datapoint.register();

export type DatapointType = {
	tsDate?: string;
	hhDate?: string;
	tsFrc?: number;
	hhFrc?: number;
	tsCond?: number;
	tsTemp?: number;
	upload: string;
	fieldsite: string;
	_id: string;
};

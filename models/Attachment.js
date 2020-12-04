var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Attachment Model
 * ==========
 */
var Attachment = new keystone.List("Attachment", {
	label: "Attachment",
	nocreate: true,
	// noedit: true,
	autokey: { path: "name", from: "dateUploaded", unique: true },
});

const dateFormat = process.env.DATE_FORMAT;

Attachment.add(
	{
		dateUploaded: {
			type: Types.Datetime,
			index: true,
			// format: dateFormat,
			utc: false,
			default: Date.now,
			noedit: true
		},
		user: { type: Types.Relationship, ref: "User", index: true, noedit: true },
		fieldsite: { type: Types.Relationship, ref: "Fieldsite", index: true, noedit: true },
	},
	"Rewind Fieldsite",
	{
		rewind: {
			type: Types.Boolean,
			initial: false,
			default: false,
			label: "Rewind Fieldsite on Save",
		},
	}
);

Attachment.schema.pre("save", function (next) {
	if (this.rewind) {
		this.rewind = false;
		this.rewindFieldsite();
	}
	next();
});

Attachment.schema.methods.rewindFieldsite = async function () {
	const nextAttachments = await Attachment.model.find({ dateUploaded: { $gt: this.dateUploaded } }).exec();
	nextAttachments.forEach((attachment) => {
		attachment.remove();
	})
	const Datapoint = keystone.list("Datapoint");
	Datapoint.model.updateMany({attachment: this.id}, {active: true}).exec();
};

Attachment.schema.pre("remove", function (next) {
	const Datapoint = keystone.list("Datapoint");
	Datapoint.model.remove({ attachment: this.id }).exec();

	next();
});

/**
 * Relationships
 */
Attachment.relationship({ ref: 'Datapoint', refPath: 'attachment', path: 'datapoints'});

/**
 * Registration
 */
Attachment.defaultColumns = "name, dateUploaded";
Attachment.register();

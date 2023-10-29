var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Upload Model
 * ==========
 */
var Upload = new keystone.List("Upload", {
	label: "Upload",
	nocreate: true,
	autokey: { path: "name", from: "dateUploaded", unique: true },
});

Upload.add(
	{
		dateUploaded: {
			type: Types.Datetime,
			index: true,
			utc: false,
			default: Date.now,
			noedit: true,
		},
		// nDuplicates: {type: Types.Number, index: false, noedit: true, default: 0, label: 'Number of duplicate datapoints skipped'},
		// nBefore: {type: Types.Number, index: false, noedit: true, default: 0, label: 'Number of fieldsite datapoints before'},
		user: {
			type: Types.Relationship,
			ref: "User",
			index: true,
			noedit: true,
		},
		content: {
			type: Types.Html,
			initial: false,
			required: false,
			height: 400,
			wysiwyg: true,
		},
		fieldsite: {
			type: Types.Relationship,
			ref: "Fieldsite",
			index: true,
			noedit: true,
		},
		status: {
			type: Types.Select,
			default: "new",
			options: ["new", "processing", "error", "ready"],
		},
		overwriting: {
			type: Types.Boolean,
			default: false,
		},
		containerName: {
			type: Types.Text,
			default: process.env.AZURE_STORAGE_CONTAINER,
		},
		rawDataUrl: {
			type: Types.Url,
			initial: false,
			label: "Download Raw Data",
			watch: true,
			value: getRawDataUrl,
			noedit: true,
		},
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

Upload.schema.pre("save", function (next) {
	if (this.rewind) {
		this.rewind = false;
		this.rewindFieldsite();
	}
	if (this.isNew) {
		this.wasNew = true;
	}
	next();
});

Upload.schema.methods.rewindFieldsite = async function () {
	const nextUploads = await Upload.model
		.find({ dateUploaded: { $gt: this.dateUploaded } })
		.exec();
	nextUploads.forEach((upload) => {
		upload.remove();
	});
	const Datapoint = keystone.list("Datapoint");
	Datapoint.model.updateMany({ upload: this.id }, { active: true }).exec();
};

Upload.schema.pre("remove", function (next) {
	const Datapoint = keystone.list("Datapoint");
	Datapoint.model.remove({ upload: this.id }).exec();

	next();
});
function getRawDataUrl() {
	return `${keystone.get("locals").weburl}api/upload/fetchrawdata?uploadId=${
		this.id
	}`;
}

/**
 * Relationships
 */
Upload.relationship({
	ref: "Datapoint",
	refPath: "upload",
	path: "datapoints",
});

/**
 * Registration
 */
Upload.defaultColumns = "name, dateUploaded";
Upload.register();

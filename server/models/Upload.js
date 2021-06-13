var keystone = require("keystone");
const { update } = require("lodash");
var Types = keystone.Field.Types;
const moment = require("moment");
const DataTypes = require("../utils/enums").DataTypes;

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
		// TODO get most recent upload's total rows after
		this.wasNew = true;
	}
	next();
});

Upload.schema.post("save", function () {
	if (this.wasNew) {
		this.populate("user fieldsite")
			.execPopulate()
			.then((upload) => {
				upload.sendNotificationEmail();
			});
	}
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

function updateContent(model) {
	return (err, { html }) => {
		if (err) {
			console.error(err);
			return;
		} else {
			model.content = html;
			model.save();
		}
	};
}

Upload.schema.methods.sendNotificationEmail = async function (callback) {
	if (typeof callback !== "function") {
		callback = function (err) {
			if (err) {
				console.error(
					"There was an error sending the upload notification email:",
					err
				);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log("Unable to send email - no mailgun credentials provided");
		return callback(new Error("could not find mailgun credentials"));
	}

	const Datapoint = keystone.list("Datapoint");

	let locals = {
		host: keystone.get("locals").weburl,
		support: process.env.SUPPORT_EMAIL || process.env.ADMIN_EMAIL,
		fieldsiteName: this.fieldsite.name,
		formattedDate: moment.utc(new Date()).format("YYYY-MM-DD hh:mm A UTC"),
	};

	let info = {
		// dupRows: this.nDuplicates,
		// nBefore: this.nBefore
	};

	info.stdRows = await Datapoint.model
		.count({ upload: this.id, type: DataTypes.STANDARDIZED })
		.exec();
	info.errRows = await Datapoint.model
		.count({ upload: this.id, type: DataTypes.ERRONEOUS })
		.exec();
	// info.rowsAfter = info.nBefore + info.stdRows

	locals.info = info;
	locals.instructionsUrl = locals.host + "pages/instructions";
	locals.firstName = this.user.name.first;

	const email = new keystone.Email({
		templateName: "upload-notification",
		transport: "mailgun",
	});

	email.render(locals, updateContent(this));

	// email.send({
	// 	to: this.user.email,
	// 	from: `SWOT Support <${locals.support}>`,
	// 	'o:tracking': false,
	// 	subject: 'New Data Uploaded to SWOT',
	// 	...locals
	// }, callback);
};

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

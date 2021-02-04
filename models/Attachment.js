var keystone = require("keystone");
const { update } = require("lodash");
var Types = keystone.Field.Types;
const moment = require('moment');
const DataTypes = require('../utils/enums').DataTypes;

/**
 * Attachment Model
 * ==========
 */
var Attachment = new keystone.List("Attachment", {
	label: "Attachment",
	nocreate: true,
	autokey: { path: "name", from: "dateUploaded", unique: true },
});

Attachment.add(
	{
		dateUploaded: {
			type: Types.Datetime,
			index: true,
			utc: false,
			default: Date.now,
			noedit: true
		},
		// nDuplicates: {type: Types.Number, index: false, noedit: true, default: 0, label: 'Number of duplicate datapoints skipped'},
		// nBefore: {type: Types.Number, index: false, noedit: true, default: 0, label: 'Number of fieldsite datapoints before'},
		user: { type: Types.Relationship, ref: "User", index: true, noedit: true },
		content: { type: Types.Html, initial: false, required: false, height: 400, wysiwyg: true },
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
	if (this.isNew) {
		// TODO get most recent attachment's total rows after
		this.wasNew = true;
	}
	next();
});

Attachment.schema.post('save', function () {
	if (this.wasNew) {
		this.populate('user fieldsite').execPopulate()
		.then((attachment) => {
			attachment.sendNotificationEmail();
		});
	}
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

function updateContent(model) {
	return (err, {html}) => {
		if (err) {
			console.error(err);
			return;
		}
		else {
			model.content = html;
			model.save();
		}
	}
}

Attachment.schema.methods.sendNotificationEmail = async function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the upload notification email:', err);
			}
		};
	}
	
	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}
	
	const Datapoint = keystone.list("Datapoint");

	let locals = {
		host: keystone.get('locals').weburl,
		support: process.env.SUPPORT_EMAIL || process.env.ADMIN_EMAIL,
		fieldsiteName: this.fieldsite.name,
		formattedDate: moment.utc(new Date()).format('YYYY-MM-DD hh:mm A UTC'),
	}
	
	let info = {
		// dupRows: this.nDuplicates,
		// nBefore: this.nBefore
	}
	
	info.stdRows = await Datapoint.model.count({attachment: this.id, type: DataTypes.STANDARDIZED}).exec();
	info.errRows = await Datapoint.model.count({attachment: this.id, type: DataTypes.ERRONEOUS}).exec();
	// info.rowsAfter = info.nBefore + info.stdRows

	
	locals.info = info;
	locals.instructionsUrl = locals.host + 'pages/instructions';
	
	const email = new keystone.Email({
		templateName: 'upload-notification',
		transport: 'mailgun',
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
Attachment.relationship({ ref: 'Datapoint', refPath: 'attachment', path: 'datapoints'});

/**
 * Registration
 */
Attachment.defaultColumns = "name, dateUploaded";
Attachment.register();

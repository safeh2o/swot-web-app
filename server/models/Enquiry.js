var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List("Enquiry", {
	nocreate: true,
	noedit: true,
});

Enquiry.add(
	{
		name: { type: Types.Name, required: true },
		email: { type: Types.Email, required: true },
		phone: { type: Types.Text, required: false },
		reason: {
			type: Types.Select,
			required: true,
			options: [
				{ value: "register", label: "I want to sign up" },
				{ value: "message", label: "Just leaving a message" },
				{ value: "question", label: "I've got a question" },
				{ value: "other", label: "Something else..." },
			],
		},
		message: { type: Types.Markdown, required: true },
		createdAt: { type: Types.Datetime, default: Date.now },
	},
	{ heading: "Create and Welcome User", dependsOn: { reason: "register" } },
	{
		createUser: {
			type: Types.Url,
			initial: false,
			label: "Create User with this Info",
			note: "Password defaults to the same as email",
			dependsOn: { reason: "register" },
			watch: true,
			value: getUserCreationUrl,
			noedit: true,
		},
	}
);

function getUserCreationUrl() {
	return `${keystone.get("locals").weburl}api/user/create?enquiryId=${
		this.id
	}`;
}

Enquiry.schema.pre("save", function (next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post("save", function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== "function") {
		callback = function (err) {
			if (err) {
				console.error(
					"There was an error sending the notification email:",
					err
				);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log("Unable to send email - no mailgun credentials provided");
		return callback(new Error("could not find mailgun credentials"));
	}

	var enquiry = this;
	var brand = keystone.get("brand");

	var toEmail = [];
	var emails = [process.env.ACCOUNTS_ADMIN_EMAIL, process.env.SUPPORT_EMAIL];
	emails.forEach((email) => {
		if (email) {
			toEmail.push(email);
		}
	});

	new keystone.Email({
		templateName: "enquiry-notification",
		transport: "mailgun",
	}).send(
		{
			to: toEmail.length ? toEmail : process.env.ADMIN_EMAIL,
			from: {
				name: process.env.FROM_ADDRESS,
				email: process.env.FROM_ADDRESS,
			},
			subject: "Contact Form Submitted for SWOT",
			"o:tracking": false,
			enquiry: enquiry,
			brand: brand,
			weburl: keystone.get("locals").weburl,
		},
		callback
	);
};

Enquiry.defaultSort = "-createdAt";
Enquiry.defaultColumns = "name, email, reason, createdAt";
Enquiry.register();

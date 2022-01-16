const sgMail = require("@sendgrid/mail");
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
				{ value: "question", label: "I have a question" },
				{ value: "other", label: "Something else..." },
			],
		},
		message: { type: Types.Text, required: true },
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

	const weburl = keystone.get("locals").weburl;

	const createLink = this.reason == "register" ? this.createUser : undefined;
	const viewLink = weburl + "admin/enquiries/" + this.id;

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	// staff email
	const msgToStaff = {
		to: process.env.SUPPORT_EMAIL,
		from: `SWOT Support <${process.env.FROM_EMAIL}>`,
		templateId: process.env.SENDGRID_STAFF_CONTACT_TEMPLATE_ID,
		dynamicTemplateData: {
			name: this.name.full,
			email: this.email,
			reason: this._.reason.format(),
			message: this.message,
			createLink,
			viewLink,
			inquiryTimestamp: this._.createdAt.format(),
		},
	};
	sgMail
		.send(msgToStaff)
		.then(() => {
			console.log("Contact form forwarded to staff");
		})
		.catch((err) => {
			console.error(
				"An error occurred trying to forward contact form to staff",
				err
			);
		});

	// guest email
	const msgToGuest = {
		to: this.email,
		from: `SWOT Support <${process.env.FROM_EMAIL}>`,
		templateId: process.env.SENDGRID_GUEST_CONTACT_TEMPLATE_ID,
	};
	sgMail
		.send(msgToGuest)
		.then(() => {
			console.log("Contact form confirmation email sent to guest");
		})
		.catch((err) => {
			console.error(
				"An error occurred trying to send confirmation email to guest",
				err
			);
		});
};

Enquiry.defaultSort = "-createdAt";
Enquiry.defaultColumns = "name, email, reason, createdAt";
Enquiry.register();

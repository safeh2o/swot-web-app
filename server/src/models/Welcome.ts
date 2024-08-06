import * as mail from "@sendgrid/mail";
import * as airtable from "airtable";
import * as keystone from "keystone";
const Types = keystone.Field.Types;

/**
 * Welcome Model
 * =============
 */

const Welcome = new keystone.List("Welcome", {});

Welcome.add({
	user: {
		type: Types.Relationship,
		ref: "User",
		required: true,
		initial: true,
		noedit: true,
	},
	createdAt: { type: Date, default: Date.now, noedit: true },
});

Welcome.schema.pre("save", async function (next) {
	if (this.isNew) {
		const welcome = await this.populate("user").execPopulate();

		welcome.sendNotificationEmail();
		welcome.user.welcome = true;
		welcome.user.save();

		// Add Airtable record
		const base = new airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
			process.env.AIRTABLE_BASE
		);
		base("Welcomes").create(
			{
				id: welcome._id,
				user: welcome.user.name.full,
				userId: welcome.user._id,
				createdAt: welcome.createdAt,
			},
			{ typecast: true },
			function (err, record) {
				if (err) {
					console.error(err);
					return;
				}
				console.log("Welcome record created in Airtable:", record.getId());
			}
		);
	}

	next();
});

Welcome.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== "function") {
		callback = function (err) {
			if (err) {
				console.error("There was an error sending the welcome email:", err);
			}
		};
	}

	const confirmUrl =
		keystone.get("locals").weburl + "resetpassword/" + this.user.resetPasswordKey;
	const firstName = this.user.name.first;

	mail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: this.user.email,
		from: `SWOT Accounts <${process.env.FROM_EMAIL}>`,
		templateId: process.env.SENDGRID_USER_CREATION_TEMPLATE_ID,
		dynamicTemplateData: {
			confirmUrl,
			firstName,
		},
	};

	mail.send(msg)
		.then(() => {
			console.log("Welcome email sent to user", this.user.email);
		})
		.catch((err) => {
			console.error("Error occurred while sending welcome to user", this.user.email, err);
		});
};

Welcome.defaultSort = "-createdAt";
Welcome.defaultColumns = "user, createdAt";
Welcome.register();

export type WelcomeType = {
	user: string;
	createdAt: string;
	_id: string;
};

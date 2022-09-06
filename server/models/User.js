const sgMail = require("@sendgrid/mail");
var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List("User");

User.add(
	{
		name: { type: Types.Name, required: true, index: true },
		email: {
			type: Types.Email,
			initial: true,
			required: true,
			unique: true,
			index: true,
		},
		password: { type: Types.Password, initial: true, required: true },
		welcome: {
			type: Types.Boolean,
			label: "Send Welcome Email",
			noedit: true,
			initial: true,
		},
		area: {
			type: Types.Relationship,
			label: "Assigned Area",
			ref: "Area",
			many: true,
			initial: true,
			hidden: true,
			noedit: true,
			index: false,
		},
		resetPasswordKey: { type: Types.Text, hidden: true, initial: false },
	},
	"Permissions",
	{
		isAdmin: {
			type: Types.Boolean,
			label: "Can access Keystone",
			index: true,
		},
	}
);

// Provide access to Keystone
User.schema.virtual("canAccessKeystone").get(function () {
	return this.isAdmin;
});

User.schema.pre("save", function (next) {
	this.wasNew = this.isNew;
	next();
});

User.schema.post("save", function () {
	if (!this.wasNew) return;

	var Area = keystone.list("Area");
	Area.model.updateMany(
		{ _id: { $in: this.area } },
		{ $push: { users: this._id } },
		(err) => {
			if (err) {
				console.error(
					`Error adding user ${this.name.full} to area during creation.`,
					err
				);
				return;
			}
		}
	);

	if (this.welcome) {
		const user = this;
		this.requestResetPassword(function () {
			var Welcome = keystone.list("Welcome");
			Welcome.model.create({ user });
		});
	}
});

User.schema.methods.requestResetPassword = function (callback) {
	if (typeof callback !== "function") {
		callback = function (err) {
			if (err) {
				console.error(
					"There was an error requesting user password reset:",
					err
				);
			}
		};
	}

	this.resetPasswordKey = keystone.utils.randomString([16, 24]);
	this.save(function (err) {
		callback(err);
		return err;
	});
};

User.schema.methods.sendEmailToResetPassword = function () {
	let weburl = keystone.get("locals").weburl;

	const passwordResetUrl = weburl + "resetpassword/" + this.resetPasswordKey;
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: this.email,
		from: `SWOT Accounts <${process.env.FROM_EMAIL}>`,
		templateId: process.env.SENDGRID_PASSWORD_RESET_TEMPLATE_ID,
		dynamicTemplateData: {
			passwordResetUrl,
		},
	};

	sgMail
		.send(msg)
		.then(() => {
			console.log("Password reset email sent to user", this.email);
		})
		.catch((err) => {
			console.error(
				"Error occurred while sending password reset email sent to user",
				this.email,
				err
			);
		});
};

/**
 * Relationships
 */
User.relationship({ ref: "Dataset", path: "datasets", refPath: "user" });
User.relationship({ ref: "Area", path: "area", refPath: "users" });
User.relationship({ ref: "Post", path: "posts", refPath: "author" });
/**
 * Registration
 */
User.defaultColumns = "name, email, isAdmin";
User.register();

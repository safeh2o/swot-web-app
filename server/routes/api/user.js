const keystone = require("keystone");
const User = keystone.list("User");
const Enquiry = keystone.list("Enquiry");
const dataService = require("../../utils/data.service");
const _ = require("lodash");

/**
 * Update current user profile
 */
exports.update = async function (req, res) {
	const messages = { errors: [], notices: {} };
	const terminate = () => {
		res.json({ messages });
		return;
	};
	const handleError = () => {
		messages.errors.push("An unknown error has occurred");
		terminate();
		return;
	};

	if (!req.body.firstName || !req.body.lastName || !req.body.email) {
		messages.errors.push("Name and email are required fields");
		return terminate();
	}
	if (req.body.password1 || req.body.password2) {
		if (
			(req.body.password1 && !req.body.password2) ||
			(req.body.password2 && !req.body.password1)
		) {
			messages.errors.push("Both password fields are required");
			return terminate();
		}

		if (req.body.password1 !== req.body.password2) {
			messages.errors.push("Passwords do not match");
			return terminate();
		}

		if (req.body.password1.length < 6 || req.body.password2.length < 6) {
			messages.errors.push("Password should be minimum 6 characters");
			return terminate();
		}
	}

	User.model.findOne({ _id: req.user.id }, function (err, user) {
		if (err) {
			return handleError();
		} else {
			if (req.body.password1 && req.body.password2) {
				user.password = req.body.password1;
			}

			user.name.first = req.body.firstName;
			user.name.last = req.body.lastName;
			user.email = req.body.email;

			user.save(function (saveError) {
				if (saveError) {
					return handleError();
				}
				messages.notices.success =
					"Profile has been successfully updated";
				return terminate();
			});
		}
	});
};

exports.createFromEnquiry = async function (req, res) {
	if (!req.user) {
		res.redirect("/admin/signin", 302);
		return false;
	}

	if (!req.user.isAdmin) {
		res.status(403).send("Insufficient Privilleges");
		return false;
	}

	if (!req.query.enquiryId) {
		res.status(400).send("Invalid enquiry id");
		return false;
	}

	const enquiry = await Enquiry.model
		.findOne({ _id: req.query.enquiryId })
		.exec();

	if (!enquiry) {
		res.status(404).send();
		return false;
	}

	const userExists = await User.model
		.findOne({ email: enquiry.email })
		.exec();
	if (userExists) {
		res.status(409).send(
			`User already exists with the email ${enquiry.email}.`
		);
		return;
	}

	// create user from enquiry with first name, last name and email
	const user = await User.model.create({
		name: enquiry.name,
		email: enquiry.email,
		password: enquiry.email,
		isAdmin: false,
		welcome: true,
	});

	res.send(`Created new user with email ${user.email}`);
	return true;
};

exports.getFieldsites = async function (req, res) {
	const fieldsites = await dataService.getUserFieldsites(req.user._id);

	res.json({ fieldsites });
};

exports.getProjects = async function (req, res) {
	const projects = await dataService.getUserProjects(req.user._id);

	res.json({ projects });
};

async function isResetKeyValid(key) {
	const user = await User.model
		.findOne()
		.where("resetPasswordKey", key)
		.exec();

	return user !== null;
}

exports.validateResetKey = async function (req, res) {
	let success = false;
	let messages = { errors: {} };
	const terminate = () => {
		res.json({ success, messages });
	};
	const handleError = (msg = "An unknown error has occurred") => {
		messages.errors.push(msg);
		terminate();
		return;
	};
	if (!req.query.key) {
		return handleError();
	}

	const valid = await isResetKeyValid(req.query.key);
	if (!valid) {
		return handleError("Sorry, that reset password key isn't valid.");
	}

	terminate();
};

exports.resetPassword = async function (req, res) {
	let messages = { errors: {}, notices: {} };
	const terminate = () => {
		res.json({ messages });
	};
	const handleError = (msg = "An unknown error has occurred") => {
		messages.errors.push(msg);
		terminate();
		return;
	};
	if (!req.body.password || !req.body.password_confirm) {
		messages.errors.password = {
			error: "Please enter, and confirm your new password.",
		};
		terminate();
		return;
	}

	if (req.body.password != req.body.password_confirm) {
		messages.errors.password = {
			error: "Please make sure both passwords match.",
		};
		terminate();
		return;
	}

	const valid = await isResetKeyValid(req.body.resetkey);
	if (!valid) {
		return handleError("Sorry, that reset password key isn't valid.");
	}

	User.model
		.findOne()
		.where("resetPasswordKey", req.body.resetkey)
		.exec(function (err, userFound) {
			if (err) return next(err);
			userFound.password = req.body.password;
			userFound.resetPasswordKey = "";
			userFound.save(function (err) {
				if (err) return handleError();
				messages.notices.success =
					"Your password has been reset, please sign in.";
				terminate();
				return;
			});
		});
};

exports.getCurrentUser = async function (req, res) {
	if (!req.user) {
		res.json({ user: null });
		return;
	}

	const fields = ["_id", "isAdmin", "name", "email"];
	const user = _.pick(req.user, fields);

	const fieldsites = await dataService.getUserFieldsites(user._id);

	res.json({ user: { ...user, fieldsites } });
};

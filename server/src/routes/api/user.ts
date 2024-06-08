import * as keystone from "keystone";
import { AreaService } from "../../models/Area";
import { CountryService } from "../../models/Country";
import { FieldsiteService } from "../../models/Fieldsite";
import * as dataService from "../../utils/data.service";
const User = keystone.list("User");
const Dataset = keystone.list("Dataset");
const Enquiry = keystone.list("Enquiry");

/**
 * Update current user profile
 */
export async function update(req, res) {
	const messages = { errors: [], notices: [] };
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
				messages.notices.push("Profile has been successfully updated");
				return terminate();
			});
		}
	});
}

export async function createFromEnquiry(req, res) {
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

	const enquiry = await Enquiry.model.findOne({ _id: req.query.enquiryId }).exec();

	if (!enquiry) {
		res.status(404).send();
		return false;
	}

	const userExists = await User.model.findOne({ email: enquiry.email }).exec();
	if (userExists) {
		res.status(409).send(`User already exists with the email ${enquiry.email}.`);
		return;
	}

	// create fieldsite for user on demo area
	const fieldsite = await FieldsiteService.create({
		name: `${enquiry.organisation} - ${enquiry.name.full} - Fieldsite`,
	});

	// create demo area
	const demoArea = await AreaService.create({
		name: `${enquiry.organisation} - ${enquiry.name.full} - Area`,
		fieldsites: [fieldsite._id],
	});

	// find demo country
	const demoCountry = await CountryService.findOne({ name: "Demo Country" });
	demoCountry.areas.push(demoArea._id);

	await CountryService.findOneAndUpdate({ name: "Demo Country" }, demoCountry);

	// create user from enquiry with first name, last name and email
	const user = await User.model.create({
		name: enquiry.name,
		email: enquiry.email,
		password: enquiry.email,
		phone: enquiry.phone,
		organisation: enquiry.organisation,
		isAdmin: false,
		welcome: true,
		area: [demoArea._id],
	});

	res.send(`Created new user with email ${user.email}`);
	return true;
}

export async function getFieldsites(req, res) {
	const fieldsites = await dataService.getUserFieldsites(req.user._id);

	res.json({ fieldsites });
}

export async function getFieldsitesByArea(req, res) {
	if (!req.query.area) {
		res.sendStatus(400);
		return;
	}
	const fieldsites = await dataService.getFieldsitesByArea(req.query.area);

	res.json({ fieldsites });
}

async function isResetKeyValid(key) {
	const user = await User.model.findOne().where("resetPasswordKey", key).exec();

	return user !== null;
}

export async function validateResetKey(req, res) {
	const success = false;
	const messages = { errors: [] };
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
}

export async function resetPassword(req, res, next) {
	const messages = { errors: [], notices: [] };
	const terminate = () => {
		res.json({ messages });
	};
	const handleError = (msg = "An unknown error has occurred") => {
		messages.errors.push(msg);
		terminate();
		return;
	};
	if (!req.body.password || !req.body.confirmPassword) {
		messages.errors.push("Please enter, and confirm your new password.");
		terminate();
		return;
	}

	if (req.body.password != req.body.confirmPassword) {
		messages.errors.push("Please make sure both passwords match.");
		terminate();
		return;
	}

	const valid = await isResetKeyValid(req.body.resetKey);
	if (!valid) {
		return handleError("Sorry, that reset password key isn't valid.");
	}

	User.model
		.findOne()
		.where("resetPasswordKey", req.body.resetKey)
		.exec(function (err, userFound) {
			if (err) return next(err);
			userFound.password = req.body.password;
			userFound.resetPasswordKey = "";
			userFound.save(function (err) {
				if (err) return handleError();
				messages.notices.push("Your password has been reset, please sign in.");
				terminate();
				return;
			});
		});
}

export async function getUserDatasets(req, res) {
	if (!req.user) {
		res.sendStatus(403);
		return;
	}
	const datasets = await Dataset.model
		.find({
			fieldsite: req.query.fieldsite,
		})
		.populate({ path: "user", select: "name" });
	res.json({ datasets });
}

export async function forgotPassword(req, res) {
	const messages = { errors: [], notices: [] };
	const terminate = () => {
		res.json({ messages });
	};

	const handleError = () => {
		messages.errors.push("An unknown error has occurred");
		terminate();
		return;
	};

	const setSuccessMessage = () => {
		messages.notices.push(
			"Thanks! If there is a SWOT account associated with that email address, you'll get an email with a reset password link shortly."
		);
	};

	if (!req.body.email) {
		messages.errors.push("Please enter an email address.");
		terminate();
		return;
	}

	User.model
		.findOne()
		.where("email", req.body.email)
		.exec(function (err, user) {
			if (err) return handleError();
			else if (!user) {
				setSuccessMessage();
				terminate();
				return;
			} else {
				let err = user.requestResetPassword();
				if (!err) {
					err = user.sendEmailToResetPassword();
				}
				if (!err) {
					setSuccessMessage();
					terminate();
				} else {
					console.error("Error occurred trying to reset valid user password", err);
					return handleError();
				}
			}
		});
}

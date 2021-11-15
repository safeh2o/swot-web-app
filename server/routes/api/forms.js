const keystone = require("keystone");
const Enquiry = keystone.list("Enquiry");
const User = keystone.list("User");
const _ = require("lodash");
const FormData = require("form-data");

exports.contact = async function (req, res) {
	const newEnquiry = new Enquiry.model();
	const updater = newEnquiry.getUpdateHandler(req);
	let validationErrors = {};
	const messages = { errors: [], notices: [] };
	let success = false;
	const INVALID_TOKEN_MESSAGE = "Invalid captcha token, please try again.";
	const CONTACT_SUCCESS_MESSAGE =
		"Thank you, we will get back to you shortly!";
	const INVALID_TOKEN_ERROR = { error: INVALID_TOKEN_MESSAGE };

	const captchaResp = req.body["g-recaptcha-response"];

	if (!captchaResp) {
		validationErrors.captcha = INVALID_TOKEN_ERROR;
	}

	const recaptchaForm = new FormData();
	recaptchaForm.append("secret", process.env.GOOGLE_RECAPTCHA_SECRET_KEY);
	recaptchaForm.append("response", captchaResp);
	recaptchaForm.submit(
		"https://www.google.com/recaptcha/api/siteverify",
		(err, captchaRes) => {
			let captchaResData = "";
			let captchaResJson = {};
			captchaRes.on("data", (chunk) => {
				captchaResData += chunk;
			});
			captchaRes.on("end", () => {
				captchaResJson = JSON.parse(captchaResData);
				if (captchaResJson.success) {
					updater.process(
						req.body,
						{
							fields: "name, email, reason, message, phone",
						},
						function (errors) {
							if (errors) {
								_.forEach(errors.detail, (err) => {
									messages.errors.push(err.error);
								});
							} else {
								success = true;
								messages.notices.push(CONTACT_SUCCESS_MESSAGE);
							}
							res.json({ messages, success });
						}
					);
				} else {
					messages.errors.push(INVALID_TOKEN_MESSAGE);
					res.json({ messages, success });
				}
			});
		}
	);
};

exports.getContactReasons = async function (req, res) {
	res.json(Enquiry.fields.reason.ops);
};

exports.forgotPassword = async function (req, res) {
	let messages = { errors: [], notices: {} };
	const terminate = () => {
		res.json({ messages });
	};

	const handleError = () => {
		messages.errors.push("An unknown error has occurred");
		terminate();
		return;
	};

	const setSuccessMessage = () => {
		messages.notices.success =
			"Thanks! If there is a SWOT account associated with that email address, you'll get an email with a reset password link shortly.";
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
			if (!user) {
				// req.flash('error', "Sorry, That email address is not registered in our application.");
				setSuccessMessage();
				terminate();
				return;
			}

			let host = keystone.get("locals").weburl;

			host = host.includes("http") ? host : "https://" + host;
			host += host.endsWith("/") ? "" : "/";

			user.resetPasswordKey = keystone.utils.randomString([16, 24]);
			user.save(function (err) {
				if (err) return handleError();
				new keystone.Email({
					templateName: "forgotpassword",
					transport: "mailgun",
				}).send(
					{
						user: user,
						host: host,
						link: "resetpassword/" + user.resetPasswordKey,
						subject: "Reset your Password for SWOT",
						"o:tracking": false,
						to: user.email,
						from: {
							name: process.env.FROM_ADDRESS,
							email: process.env.FROM_ADDRESS,
						},
					},
					function (err) {
						if (err) {
							console.error(err);
							messages.errors.push(
								"Error sending reset password email!"
							);
							terminate();
							return;
						} else {
							setSuccessMessage();
						}
						terminate();
					}
				);
			});
		});
};

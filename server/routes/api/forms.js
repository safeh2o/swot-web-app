const keystone = require("keystone");
const Enquiry = keystone.list("Enquiry");
const User = keystone.list("User");
const https = require("https");
const querystring = require("querystring");

exports.contact = async function (req, res) {
	const newEnquiry = new Enquiry.model();
	const updater = newEnquiry.getUpdateHandler(req);
	let validationErrors = {};
	let success = false;
	const INVALID_TOKEN_MESSAGE = "Invalid captcha token, please try again.";
	const INVALID_TOKEN_ERROR = { error: INVALID_TOKEN_MESSAGE };

	const captchaResp = req.body["g-recaptcha-response"];

	const postData = querystring.stringify({
		secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
		response: captchaResp,
	});

	if (!captchaResp) {
		validationErrors.captcha = INVALID_TOKEN_ERROR;
	}

	const headers = {
		"Content-Type": "application/x-www-form-urlencoded",
		"Content-Length": postData.length,
	};

	const options = {
		hostname: "www.google.com",
		path: "/recaptcha/api/siteverify",
		port: 443,
		method: "POST",
		headers: headers,
	};

	const captchaReq = https.request(options, (captchaRes) => {
		captchaRes.on("data", (d) => {
			const captchaResData = JSON.parse(d);
			if (captchaResData.success) {
				updater.process(
					req.body,
					{
						fields: "name, email, reason, message, phone",
					},
					function (err) {
						if (err) {
							validationErrors = err.detail;
						} else {
							success = true;
						}
						res.json({ validationErrors, success });
					}
				);
			} else {
				validationErrors.captcha = INVALID_TOKEN_ERROR;
				res.json({ validationErrors, success });
			}
		});
	});

	captchaReq.on("error", (e) => {
		console.error(e);
	});
	captchaReq.write(postData);
	captchaReq.end();
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

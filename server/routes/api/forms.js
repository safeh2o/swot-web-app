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

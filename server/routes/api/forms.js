const keystone = require("keystone");
const Enquiry = keystone.list("Enquiry");
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
		secret: process.env.RECAPTCHA_SECRET_KEY,
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
						fields: "name, email, reason, message",
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

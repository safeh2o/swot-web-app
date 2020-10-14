const keystone = require('keystone');
const Enquiry = keystone.list('Enquiry');
const https = require('https');
const querystring = require('querystring');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.reasons = Enquiry.fields.reason.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.grecaptcha = process.env.RECAPTCHA_SITE_KEY;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		const newEnquiry = new Enquiry.model();
		const updater = newEnquiry.getUpdateHandler(req);

		const postData = querystring.stringify({
			'secret': process.env.RECAPTCHA_SECRET_KEY,
			'response': req.body['g-recaptcha-response']
		});

		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}

		const options = {
			hostname: 'www.google.com',
			path: '/recaptcha/api/siteverify',
			port: 443,
			method: 'POST',
			headers: headers
		}

		const captchaReq = https.request(options, (captchaRes) => {
			captchaRes.on('data', (d) => {
				const captchaResData = JSON.parse(d);
				if (captchaResData.success) {
					updater.process(req.body, {
						flashErrors: true,
						fields: 'name, email, reason, message',
						errorMessage: 'There was a problem submitting your enquiry:',
					}, function (err) {
						if (err) {
							locals.validationErrors = err.detail;
							// next();
						} else {
							locals.enquirySubmitted = true;
						}
						next();
					});
				}
				else {
					req.flash('error', "Invalid captcha token, please try again.");
					next();
				}
			});
		});

		captchaReq.on('error', (e) => {
			console.error(e);
		});

		captchaReq.write(postData);

		captchaReq.end();

	});

	view.render('contact');
};

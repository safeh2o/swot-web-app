var keystone = require("keystone");

exports.default = module.exports = function (req, res) {
	if (req.user) {
		res.json({ success: true });
		return;
	}

	var onSuccess = function (user) {
		res.json({ success: true, user });
		return;
	};

	var onFail = function () {
		const messages = { errors: {} };
		messages.errors.invalid = {
			error: "Provided credentials are incorrect, please try again.",
		};
		res.json({ messages, success: false });
		return;
	};

	keystone.session.signin(
		{ email: req.body.email, password: req.body.password },
		req,
		res,
		onSuccess,
		onFail
	);
};

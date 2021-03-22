var keystone = require("keystone");

exports.default = module.exports = function (req, res) {
	if (req.user) {
		return res.redirect("/");
	}

	var onSuccess = function () {
		res.redirect("/");
	};

	var onFail = function () {
		req.flash(
			"error",
			"Provided credentials are incorrect, please try again."
		);
		res.redirect("/signin");
	};

	keystone.session.signin(
		{ email: req.body.email, password: req.body.password },
		req,
		res,
		onSuccess,
		onFail
	);
};

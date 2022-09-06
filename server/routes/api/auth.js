const keystone = require("keystone");

exports.signin = async function (req, res) {
	if (req.user) {
		res.json({ success: true });
		return;
	}

	var onSuccess = function (user) {
		res.json({ success: true, user });
		return;
	};

	var onFail = function () {
		const messages = { errors: [], notices: [] };
		messages.errors.push(
			"Provided credentials are incorrect, please try again."
		);
		res.status(401).json({ messages, success: false });
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

exports.signout = async function (req, res) {
	keystone.session.signout(req, res, () => {
		res.status(200).send();
	});
};

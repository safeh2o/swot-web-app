/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require("lodash");
const keystone = require("keystone");
const dataService = require("../utils/data.service");

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.user = req.user;
	res.locals.gtag = process.env.GOOGLE_ANALYTICS_GTAG;
	next();
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash("info"),
		success: req.flash("success"),
		warning: req.flash("warning"),
		error: req.flash("error"),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) {
		return msgs.length;
	})
		? flashMessages
		: false;
	next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash("error", "Please sign in to access this page.");
		res.redirect("/signin");
	} else {
		next();
	}
};

/**
 * Prevents actual users from accessing pages when they're already signed in, opposite of requireUser
 */
exports.requireGuest = function (req, res, next) {
	if (req.user) {
		keystone.session.signout(req, res, () => {
			res.redirect("/");
		});
	} else {
		next();
	}
};

exports.requireFieldsiteAccess = async function (req, res, next) {
	const fieldsiteId = req.body.fieldsiteId || req.params.fieldsiteId;
	const hasAccess = await dataService.isUserAllowedAccessToFieldsite(
		req.user,
		fieldsiteId
	);

	if (!hasAccess) {
		res.sendStatus(403);
	} else {
		next();
	}
};
exports.requireAreaAccess = async function (req, res, next) {
	const areaId = req.body.areaId || req.params.areaId;
	const hasAccess = await dataService.isUserAllowedAccessToArea(
		req.user,
		areaId
	);

	if (!hasAccess) {
		res.sendStatus(403);
	} else {
		next();
	}
};
exports.requireCountryAccess = async function (req, res, next) {
	const countryId = req.body.countryId || req.params.countryId;
	const hasAccess = await dataService.isUserAllowedAccessToCountry(
		req.user,
		countryId
	);

	if (!hasAccess) {
		res.sendStatus(403);
	} else {
		next();
	}
};

exports.requireOrgAccess = async function (req, res, next) {
	const hasAccess = req.user.isAdmin;

	if (!hasAccess) {
		res.sendStatus(403);
	} else {
		next();
	}
};

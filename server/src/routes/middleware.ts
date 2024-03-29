/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
import * as keystone from "keystone";
import * as _ from "lodash";

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
export function initLocals(req, res, next) {
	res.locals.user = req.user;
	res.locals.gtag = process.env.GOOGLE_ANALYTICS_GTAG;
	next();
}

/**
	Fetches and clears the flashMessages before a view is rendered
*/
export function flashMessages(req, res, next) {
	const flashMessages = {
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
}

/**
	Prevents people from accessing protected pages when they're not signed in
 */
export function requireUser(req, res, next) {
	if (!req.user) {
		req.flash("error", "Please sign in to access this page.");
		res.redirect("/signin");
	} else {
		next();
	}
}

/**
 * Prevents actual users from accessing pages when they're already signed in, opposite of requireUser
 */
export function requireGuest(req, res, next) {
	if (req.user) {
		keystone.session.signout(req, res, () => {
			res.redirect("/");
		});
	} else {
		next();
	}
}

export const api = keystone.middleware.api;

/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require("keystone");
var middleware = require("./middleware");
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes("./views"),
	api: importRoutes("./api"),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	app.post("/api/contact", keystone.middleware.api, routes.api.forms.contact);
	app.post("/api/auth", keystone.middleware.api, routes.api.auth.signin);
	app.get("/api/signout", middleware.requireUser, routes.api.auth.signout);
	app.get("/blog/:category?", routes.views.blog);
	app.get("/blog/post/:post", routes.views.post);
	app.post(
		"/api/forgotpassword",
		keystone.middleware.api,
		routes.api.user.forgotPassword
	);
	app.post(
		"/api/resetpassword",
		keystone.middleware.api,
		routes.api.user.resetPassword
	);

	// REST endpoints
	app.post(
		"/api/upload/append",
		keystone.middleware.api,
		routes.api.upload.append
	);
	app.post(
		"/api/upload/analyze",
		keystone.middleware.api,
		routes.api.upload.analyze
	);
	app.get(
		"/api/results/resolve",
		keystone.middleware.api,
		routes.api.results.resolve
	);
	app.get(
		"/api/results/download",
		keystone.middleware.api,
		routes.api.results.download
	);
	app.post(
		"/api/results/analyze-multiple",
		keystone.middleware.api,
		routes.api.results.analyzeMultiple
	);
	app.get(
		"/api/results/analyze-single",
		keystone.middleware.api,
		routes.api.results.analyzeSingle
	);
	app.post(
		"/api/user/update",
		keystone.middleware.api,
		routes.api.user.update
	);
	app.get(
		"/api/user/create",
		keystone.middleware.api,
		routes.api.user.createFromEnquiry
	);
	app.get(
		"/api/user/fieldsites",
		middleware.requireUser,
		routes.api.user.getFieldsites
	);
	app.get(
		"/api/user/resetkey",
		middleware.requireGuest,
		routes.api.user.validateResetKey
	);
	app.get(
		"/api/user/me",
		keystone.middleware.api,
		routes.api.user.getCurrentUser
	);
	app.get(
		"/api/user/datasets",
		keystone.middleware.api,
		routes.api.user.getUserDatasets
	);
	app.get(
		"/api/common/settings",
		keystone.middleware.api,
		routes.api.common.settings
	);
	app.get(
		"/api/contactreasons",
		keystone.middleware.api,
		routes.api.forms.getContactReasons
	);
	app.get(
		"/api/cms/pages/:slug",
		keystone.middleware.api,
		routes.api.cms.pages
	);
	app.get("/api/cms/posts", keystone.middleware.api, routes.api.cms.posts);
	app.get(
		"/api/cms/post-categories",
		keystone.middleware.api,
		routes.api.cms.postCategories
	);
	app.get(
		"/api/cms/posts/:slug",
		keystone.middleware.api,
		routes.api.cms.post
	);
	app.get(
		"/api/datasets/:datasetId",
		keystone.middleware.api,
		routes.api.results.dataset
	);
	app.get(
		"/api/upload/fetchrawdata",
		keystone.middleware.api,
		routes.api.upload.fetchRawData
	);
	app.get(
		"/api/upload/fetchstddata",
		keystone.middleware.api,
		routes.api.upload.fetchStdData
	);
};

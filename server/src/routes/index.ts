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

import * as keystone from "keystone";
import * as middleware from "./middleware";
import * as api from "./api";
import { middleware as trpcMiddleware } from "./api/v2/index";
import { Router } from "express";

// Common Middleware
keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

// Setup Route Bindings
export default function (app: Router) {
	app.post("/api/contact", middleware.api, api.forms.contact);
	app.post("/api/auth", middleware.api, api.auth.signin);
	app.get("/api/signout", middleware.requireUser, api.auth.signout);
	app.post("/api/forgotpassword", middleware.api, api.user.forgotPassword);
	app.post("/api/resetpassword", middleware.api, api.user.resetPassword);

	// REST endpoints
	app.post("/api/upload/append", middleware.api, api.upload.append);
	app.post("/api/upload/analyze", middleware.api, api.upload.analyze);
	app.get("/api/results/resolve", middleware.api, api.results.resolve);
	app.get("/api/results/download", middleware.api, api.results.download);
	app.post("/api/results/analyze-multiple", middleware.api, api.results.analyzeMultiple);
	app.get("/api/results/analyze-single", middleware.api, api.results.analyzeSingle);
	app.post("/api/user/update", middleware.api, api.user.update);
	app.get("/api/user/create", middleware.api, api.user.createFromEnquiry);
	app.get("/api/user/fieldsites", middleware.requireUser, api.user.getFieldsites);
	app.get("/api/user/resetkey", middleware.requireGuest, api.user.validateResetKey);
	app.get("/api/user/datasets", middleware.api, api.user.getUserDatasets);
	app.get("/api/contactreasons", middleware.api, api.forms.getContactReasons);
	app.get("/api/cms/pages/:slug", middleware.api, api.cms.pages);
	app.get("/api/cms/posts", middleware.api, api.cms.posts);
	app.get("/api/cms/faqs", middleware.api, api.cms.faqs);
	app.get("/api/cms/posts/:slug", middleware.api, api.cms.post);
	app.get("/api/datasets/:datasetId", middleware.api, api.results.dataset);
	app.get("/api/upload/fetchrawdata", middleware.api, api.upload.fetchRawData);
	app.use("/api/v2", trpcMiddleware);
}

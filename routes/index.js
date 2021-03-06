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

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
  app.get('/', routes.views.dashboard);
  app.get('/dashboard', middleware.requireUser, routes.views.dashboard);
  app.get('/download', middleware.requireUser, routes.views.download);
  app.get('/upload', middleware.requireUser, routes.views.upload);
  app.get('/results', middleware.requireUser, routes.views.results);
  app.get('/archived', middleware.requireUser, routes.views.results);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);
  app.get('/pages/:page', routes.views.page);
  app.all('/forgotpassword', routes.views.forgotpassword);
  app.post('/resetpassword', keystone.security.csrf.middleware.validate, routes.views.resetpassword);
  app.get('/resetpassword/:key', keystone.security.csrf.middleware.init, routes.views.resetpassword);
	app.all('/signin', routes.views.signin);
  
  
  // REST endpoints
  app.all('/api/upload/:id/update', keystone.middleware.api, routes.api.upload.update);
  app.all('/api/upload/create', keystone.middleware.api, routes.api.upload.create);
  app.get('/api/results/processed', keystone.middleware.api, routes.api.results.processed);
  app.get('/api/results/archived', keystone.middleware.api, routes.api.results.archived);
  app.get('/api/results/download', keystone.middleware.api, routes.api.results.download);
  app.get('/api/results/fetch', keystone.middleware.api, routes.api.results.fetch);
  app.get('/api/results/archive', keystone.middleware.api, routes.api.results.archive);
  app.get('/api/results/analyze', keystone.middleware.api, routes.api.results.analyze);
  app.post('/api/user/update', keystone.middleware.api, routes.api.user.update);
  app.get('/api/user/create', keystone.middleware.api, routes.api.user.createFromEnquiry);
  app.get('/api/data/raw', keystone.middleware.api, routes.api.data.raw);
  app.get('/api/data/standardized', keystone.middleware.api, routes.api.data.standardized);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};

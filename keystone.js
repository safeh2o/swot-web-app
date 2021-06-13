// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");
var cons = require("consolidate");
var mongoose = require("mongoose");

function checkConfigKey(configKeyName, configKeyValue) {
	if (!configKeyValue) {
		console.log(
			`ERROR: Missing configuration ${configKeyName} in .env file, exiting`
		);
		process.exit(1);
	}
}

function validateConfig() {
	checkConfigKey("MAILGUN_API_KEY", process.env.MAILGUN_API_KEY);
	checkConfigKey("MAILGUN_DOMAIN", process.env.MAILGUN_DOMAIN);
	checkConfigKey(
		"MONGO_DB_CONNECTION_STRING",
		process.env.MONGO_DB_CONNECTION_STRING
	);
	checkConfigKey("FILE_REQUIRED_COLUMNS", process.env.FILE_REQUIRED_COLUMNS);
	checkConfigKey("ANALYZER_URL", process.env.ANALYZER_URL);
	checkConfigKey(
		"AZURE_STORAGE_ACCESS_KEY",
		process.env.AZURE_STORAGE_ACCESS_KEY
	);
	checkConfigKey(
		"AZURE_STORAGE_CONTAINER_STD",
		process.env.AZURE_STORAGE_CONTAINER_STD
	);
	checkConfigKey("WEB_URL", process.env.WEB_URL);
}

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

validateConfig();

mongoose.set("server", {
	socketOptions: {
		keepAlive: 1,
	},
});

mongoose.connection.on("error", function (err) {
	console.error(`Mongoose default connection has occured ${err} error`);
	mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
});

keystone.init({
	name: "swot-web",
	brand: "swot-web",

	views: "./server/templates/views",
	"view engine": ".html",
	"custom engine": cons.nunjucks,
	"signin logo": "./server/assets/swot_logo1.png",
	mongo:
		process.env.MONGO_DB_CONNECTION_STRING ||
		"mongodb://localhost/my-project",

	emails: "./server/templates/emails",
	"auto update": true,
	session: true,
	auth: true,
	"signin url": "/signin",
	"signin redirect": "/",
	"signout redirect": "/",
	"admin path": "admin",
	"session store": "mongo",
	"user model": "User",

	compress: true,
	env: process.env.NODE_ENV || "production",
	port: 3000,
});

// Load your project's Models
keystone.import("./server/models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable,
	weburl: `${process.env.WEB_URL.startsWith("http") ? "" : "https://"}${
		process.env.WEB_URL
	}${process.env.WEB_URL.endsWith("/") ? "" : "/"}`,
	grecaptcha: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
});

keystone.set("mongoose", mongoose);

// Load your project's Routes
keystone.set("routes", require("./server/routes"));

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
	users: "users",
	countries: "countries",
	projects: "projects",
	fieldsites: "fieldsites",
	datasets: "datasets",
	blog: ["posts", "post-categories"],
	pages: "pages",
	enquiries: "enquiries",
	welcomes: "welcomes",
	datapoints: "datapoints",
	uploads: "uploads",
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();

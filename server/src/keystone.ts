import "dotenv/config";
import * as keystone from "keystone";
import * as mongoose from "mongoose";

function checkConfigKey(configKeyName: string, configKeyValue?: string) {
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
	checkConfigKey(
		"AZURE_STORAGE_CONTAINER_STD",
		process.env.AZURE_STORAGE_CONTAINER_STD
	);
	checkConfigKey("WEB_URL", process.env.WEB_URL);
	checkConfigKey("FROM_EMAIL", process.env.FROM_EMAIL);
	checkConfigKey("SUPPORT_EMAIL", process.env.SUPPORT_EMAIL);
}

// Initialise Keystone with your project's configuration.
// See http://v4.keystonejs.com/guide/config for available options
// and documentation.

validateConfig();

mongoose.set("server", {
	socketOptions: {
		keepAlive: 1,
	},
});

mongoose.connection.on("error", function (err: unknown) {
	console.error(`Mongoose default connection has occured ${err} error`);
	mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
});

keystone.init({
	name: "swot-web",
	brand: "swot-web",

	"signin logo": "./assets/swot_logo1.png",
	mongo:
		process.env.MONGO_DB_CONNECTION_STRING ||
		"mongodb://localhost/my-project",

	"auto update": false,
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
keystone.import("./models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable,
	weburl: `${process.env.WEB_URL?.startsWith("http") ? "" : "https://"}${
		process.env.WEB_URL
	}${process.env.WEB_URL?.endsWith("/") ? "" : "/"}`,
});

keystone.set("mongoose", mongoose);

// Load your project's Routes
import routes from "./routes";
keystone.set("routes", routes);

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
	users: "users",
	countries: "countries",
	areas: "areas",
	fieldsites: "fieldsites",
	datasets: "datasets",
	blog: ["posts", "post-categories"],
	pages: "pages",
	enquiries: "enquiries",
	welcomes: "welcomes",
	datapoints: "datapoints",
	uploads: "uploads",
	FAQs: "faqs",
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();

keystone.app.disable("x-powered-by");

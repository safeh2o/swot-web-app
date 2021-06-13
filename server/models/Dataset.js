var filenameUtils = require("../utils/filename");
var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Dataset = new keystone.List("Dataset", {
	strict: false,
	autokey: { path: "name", from: "startDate", unique: false },
});

var azureStorage = new keystone.Storage({
	adapter: require("keystone-storage-adapter-azure"),
	azure: {
		generateFilename: filenameUtils.swotAnalysisFilenameGenerator,
	},
	schema: {
		container: true, // optional; store the referenced container in the database
		etag: true, // optional; store the etag for the resource
		url: true, // optional; generate & store a public URL
	},
});

Dataset.add(
	{
		description: { type: Types.Textarea, initial: true, index: true },
		dateCreated: {
			type: Types.Datetime,
			utc: false,
			initial: true,
			index: true,
			label: "Date Uploaded",
		},
		startDate: {
			type: Types.Datetime,
			utc: false,
			initial: true,
			index: true,
			label: "Start Date",
		},
		endDate: {
			type: Types.Datetime,
			utc: false,
			initial: true,
			index: true,
			label: "End Date",
		},
		fieldsite: {
			type: Types.Relationship,
			ref: "Fieldsite",
			initial: true,
			index: true,
		},
		user: {
			type: Types.Relationship,
			ref: "User",
			initial: true,
			index: true,
		},
		file: {
			type: Types.File,
			storage: azureStorage,
			label: "Raw Data",
			hidden: true,
		},
		stdFile: {
			type: Types.File,
			storage: azureStorage,
			label: "Standardized Data",
			hidden: true,
		},
		archived: { type: Types.Boolean, index: true, default: false },
	},
	"Redo Analysis",
	{
		redo: {
			type: Types.Boolean,
			initial: false,
			default: false,
			label: "Redo Analysis on Save",
		},
	},
	{
		heading: "Download Data",
		dependsOn: {
			$any: [
				{ $ne: { resultsUrl: null } },
				{ $ne: { stdUrl: null } },
				{ $ne: { rawUrl: null } },
			],
		},
	},
	{
		resultsUrl: {
			type: Types.Url,
			initial: false,
			label: "Download Results",
			watch: true,
			value: getResultsUrl,
			noedit: true,
			dependsOn: { $ne: { resultsUrl: null } },
		},
		stdUrl: {
			type: Types.Url,
			initial: false,
			label: "Download Standardized Data",
			watch: true,
			value: getStandardizedUrl,
			noedit: true,
			dependsOn: { $ne: { stdUrl: null } },
		},
		rawUrl: {
			type: Types.Url,
			initial: false,
			label: "Download Raw Data",
			watch: true,
			value: getRawUrl,
			noedit: true,
			dependsOn: { $ne: { rawUrl: null } },
		},
	}
);

function getResultsUrl() {
	return `${keystone.get("locals").weburl}api/results/fetch?datasetId=${
		this.id
	}`;
}

function getStandardizedUrl() {
	if (!this.stdFile.url) {
		return null;
	}
	return `${keystone.get("locals").weburl}api/data/standardized?datasetId=${
		this.id
	}`;
}

function getRawUrl() {
	if (!this.file.url) {
		return null;
	}
	return `${keystone.get("locals").weburl}api/data/raw?datasetId=${this.id}`;
}

Dataset.schema.pre("save", function (next) {
	if (this.redo) {
		this.redo = false;
		this.runAnalysis();
	}
	next();
});

Dataset.schema.methods.runAnalysis = async function (callback) {
	const analyzer = require("../utils/analyzer");
	const dataService = require("../utils/data.service");

	const project = await dataService.getProjectByFieldsite(
		this.fieldsite.toString()
	);
	const country = await dataService.getCountryByProject(project.id);
	const populated = await this.populate("user fieldsite").execPopulate();
	let filename;
	if (!this.stdFile || !this.stdFile.filename) {
		console.log("This dataset is old, parsing old URL...");
		filename = this.file.url.substring(this.file.url.lastIndexOf("/") + 1);
		filename = filename.substring(0, filename.lastIndexOf(".")) + ".csv";
	} else {
		filename = this.stdFile.filename;
	}
	analyzer.notifyFileUpload(
		filename,
		populated.user.email,
		country,
		project,
		populated.fieldsite,
		this.user.toString(),
		this
	);
};

/**
 * Registration
 */
Dataset.defaultColumns = "name, description, dateOfReading, fieldsite, user";

Dataset.register();

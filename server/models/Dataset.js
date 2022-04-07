var keystone = require("keystone");
const { QueueServiceClient } = require("@azure/storage-queue");
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Dataset = new keystone.List("Dataset", {
	strict: false,
	autokey: { path: "name", from: "startDate", unique: false },
});

Dataset.add(
	{
		// description: { type: Types.Textarea, initial: true, index: true },
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
		maxDuration: {
			type: Types.Select,
			options: [3, 6, 9, 12, 15, 18, 21, 24],
			default: 3,
			numeric: true,
		},
		confidenceLevel: {
			type: Types.Select,
			options: [
				{ value: "minDecay", label: "Minimum Decay" },
				{ value: "optimumDecay", label: "Optimum Decay" },
				{ value: "maxDecay", label: "Maximum Decay" },
			],
			default: "optimumDecay",
		},
		archived: { type: Types.Boolean, index: true, default: false },
		isComplete: { type: Types.Boolean, index: true, default: false },
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
			label: "Download Standardized Input",
			watch: true,
			value: getStdUrl,
			noedit: true,
			dependsOn: { $ne: { resultsUrl: null } },
		},
	}
);

function getResultsUrl() {
	return `${keystone.get("locals").weburl}api/results/download?datasetId=${
		this.id
	}`;
}

function getStdUrl() {
	return `${keystone.get("locals").weburl}api/upload/fetchstddata?datasetId=${
		this.id
	}`;
}

Dataset.schema.pre("save", function (next) {
	if (this.redo) {
		this.redo = false;
		this.runAnalysis();
	}
	next();
});

Dataset.schema.methods.runAnalysis = async function () {
	const { AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_QUEUE_ANALYZE } =
		process.env;

	const queueClient = QueueServiceClient.fromConnectionString(
		AZURE_STORAGE_CONNECTION_STRING
	).getQueueClient(AZURE_STORAGE_QUEUE_ANALYZE);
	const sendMessageResponse = await queueClient.sendMessage(
		Buffer.from(
			JSON.stringify({
				datasetId: this.id,
				maxDuration: this.maxDuration,
				confidenceLevel: this.confidenceLevel,
			})
		).toString("base64")
	);
	return sendMessageResponse;
};

/**
 * Registration
 */
Dataset.defaultColumns = "name, description, dateOfReading, fieldsite, user";

Dataset.register();

const {
	generateBlobSASQueryParameters,
	BlobServiceClient,
	BlobSASPermissions,
} = require("@azure/storage-blob");
const keystone = require("keystone");
const Dataset = keystone.list("Dataset");

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
		const messages = { errors: [] };
		messages.errors.push(
			"Provided credentials are incorrect, please try again."
		);
		res.json({ messages, success: false });
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

exports.getSas = async function (req, res) {
	const { datasetId, blobName } = req.body;
	const {
		AZURE_STORAGE_CONTAINER_RESULTS,
		AZURE_STORAGE_CONNECTION_STRING,
		AZURE_STORAGE_AP_NAME,
	} = process.env;

	const dataset = await Dataset.model.findOne({ _id: datasetId });
	if (!dataset) {
		res.sendStatus(400);
		return;
	}

	const storedPolicyName = AZURE_STORAGE_AP_NAME;
	const sasOptions = {
		containerName: AZURE_STORAGE_CONTAINER_RESULTS,
		blobName,
	};

	if (storedPolicyName == null) {
		sasOptions.startsOn = new Date();
		// expires in 10 hours
		sasOptions.expiresOn = new Date(new Date().valueOf() + 3600 * 1000);
		sasOptions.permissions = BlobSASPermissions.parse("r");
	} else {
		sasOptions.identifier = storedPolicyName;
	}

	const blobServiceClient = BlobServiceClient.fromConnectionString(
		AZURE_STORAGE_CONNECTION_STRING
	);
	const containerClient = blobServiceClient.getContainerClient(
		AZURE_STORAGE_CONTAINER_RESULTS
	);

	const url = await containerClient.generateSasUrl(sasOptions);
	const token = url.match(/.+?(\?.*)/)[1];

	res.json({ token });
};

exports.signout = async function (req, res) {
	keystone.session.signout(req, res, () => {
		res.redirect("/");
	});
};

exports.settings = async function (req, res) {
	const commonSettings = {
		AZURE_STORAGE_ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT,
	};

	return res.json(commonSettings);
};

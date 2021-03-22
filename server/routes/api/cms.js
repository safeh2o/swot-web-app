const keystone = require("keystone");
const Page = keystone.list("Page");

exports.pages = async function (req, res) {
	if (!req.params.slug) {
		res.status(404).send("No page found with the given slug");
		return;
	}

	const page = await Page.model
		.findOne({ slug: req.params.slug, state: "published" })
		.exec();
	if (page) {
		res.json(page);
		return;
	}

	res.status(404).send("No page found with the given slug");

	// Page.model.findOne({})
};

const keystone = require("keystone");
const Page = keystone.list("Page");
const Post = keystone.list("Post");
const PostCategory = keystone.list("PostCategory");
const FAQ = keystone.list("FAQ");

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

exports.post = async function (req, res) {
	if (!req.params.slug) {
		res.status(404).send("No post found with the given slug");
		return;
	}

	const post = await Post.model
		.findOne({ slug: req.params.slug, state: "published" })
		.exec();
	if (post) {
		res.json(post);
		return;
	}

	res.status(404).send("No post found with the given slug");

	// Page.model.findOne({})
};

exports.postCategories = async function (req, res) {
	let categories = await PostCategory.model.find();
	categories = categories.map((category) => category.toJSON());
	const byName = {};
	const byId = {};
	categories.forEach((category) => {
		byName[category.name] = category;
		byId[category._id] = category;
	});
	return res.json({ byName, byId });
};

exports.posts = async function (req, res) {
	let posts = await Post.model
		.find(
			{ state: "published" },
			{
				slug: 1,
				"image.secure_url": 1,
				publishedDate: 1,
				title: 1,
				content: 1,
				categories: 1,
			}
		)
		.exec();

	posts = posts.map((post) => post.toJSON());

	for (let i = 0; i < posts.length; i++) {
		posts[i].publishedDate = posts[i].publishedDate.toLocaleString();
	}

	return res.json(posts);
};

exports.faqs = async function (req, res) {
	let FAQs = await FAQ.model
		.find(
			{ state: "published" },
			{
				title: 1,
				content: 1,
			}
		)
		.exec();

	FAQs = FAQs.map((FAQ) => FAQ.toJSON());

	return res.json(FAQs);
};

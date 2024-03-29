import * as keystone from "keystone";
const Page = keystone.list("Page");
const Post = keystone.list("Post");
const FAQ = keystone.list("FAQ");

export async function pages(req, res) {
	if (!req.params.slug) {
		res.status(404).send("No page found with the given slug");
		return;
	}

	const page = await Page.model.findOne({ slug: req.params.slug, state: "published" }).exec();
	if (page) {
		res.json(page);
		return;
	}

	res.status(404).send("No page found with the given slug");

	// Page.model.findOne({})
}

export async function post(req, res) {
	if (!req.params.slug) {
		res.status(404).send("No post found with the given slug");
		return;
	}

	const post = await Post.model.findOne({ slug: req.params.slug, state: "published" }).exec();
	if (post) {
		res.json(post);
		return;
	}

	res.status(404).send("No post found with the given slug");

	// Page.model.findOne({})
}

export async function posts(req, res) {
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
		.sort({ publishedDate: -1 })
		.exec();

	posts = posts.map((post) => post.toJSON());

	for (let i = 0; i < posts.length; i++) {
		posts[i].publishedDate = posts[i].publishedDate.toLocaleString();
	}

	return res.json(posts);
}

export async function faqs(req, res) {
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
}

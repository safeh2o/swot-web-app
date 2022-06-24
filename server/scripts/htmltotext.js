const keystone = require("keystone");
const Post = keystone.list("Post");
const striptags = require("striptags");

async function cleanPosts() {
	const allPosts = await Post.model.find();
	for (const post of allPosts) {
		post.content.brief = striptags(post.content.brief);
		post.save();
	}
}

module.exports = cleanPosts;

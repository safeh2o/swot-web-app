import * as keystone from "keystone";
const Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

const Post = new keystone.List("Post", {
	map: { name: "title" },
	autokey: { path: "slug", from: "title", unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true,
	},
	author: { type: Types.Relationship, ref: "User", index: true },
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: { state: "published" },
	},
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Textarea, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: "PostCategory", many: true },
});

Post.schema.virtual("content.full").get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = "title, state|20%, author|20%, publishedDate|20%";
Post.register();

export type PostType = {
	title: string;
	state: "draft" | "published" | "archived";
	author: string;
	publishedDate: string;
	image?: { secure_url?: string };
	content: { brief: string; extended: string };
	categories: string[];
	slug: string;
	_id: string;
};

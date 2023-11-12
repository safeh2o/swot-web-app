import * as keystone from "keystone";
const Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

const Page = new keystone.List("Page", {
	map: { name: "title" },
	autokey: { path: "slug", from: "title", unique: true },
});

Page.add({
	title: { type: String, required: true },
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true,
	},
	image: { type: Types.CloudinaryImage },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});

Page.defaultColumns = "title, state|20%";
Page.register();

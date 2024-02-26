import * as keystone from "keystone";
const Types = keystone.Field.Types;

/**
 * FAQ Model
 * ==========
 */

const FAQ = new keystone.List("FAQ", {
	map: { name: "title" },
	singular: "FAQ",
});

FAQ.add({
	title: { type: Types.Text, required: true, initial: true },
	content: {
		type: Types.Html,
		wysiwyg: true,
		initial: true,
	},
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true,
		initial: true,
	},
});

FAQ.defaultColumns = "title, state";
FAQ.register();

export type FAQType = {
	title: string;
	content: string;
	state: "draft" | "published" | "archived";
	_id: string;
};

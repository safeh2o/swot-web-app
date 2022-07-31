var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * FAQ Model
 * ==========
 */

var FAQ = new keystone.List("FAQ", {
	map: { name: "title" },
	singular: "FAQ",
});

FAQ.add({
	title: { type: Types.Text, required: true, initial: true },
	content: {
		type: Types.Textarea,
		height: 150,
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

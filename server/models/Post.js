var keystone = require('keystone');
var Types = keystone.Field.Types;
const updater = require('../utils/cms_updater');

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.post('save', (blog) => {
	var MongoClient = require('mongodb').MongoClient;
	var uri = keystone.get('mongo');
  
	MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
		if (err) throw err;

		if (db.s.options.dbName === process.env.CMS_SOURCE_DB) {
			updater.updateOtherBlogs(blog);
		}
	});
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();

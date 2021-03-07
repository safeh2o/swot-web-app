var keystone = require('keystone');
var Types = keystone.Field.Types;
const updater = require('../utils/cms_updater');

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Page.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  image: { type: Types.CloudinaryImage },
  content: {
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
});

Page.schema.post('save', (page) => {
  var MongoClient = require('mongodb').MongoClient;
  var uri = keystone.get('mongo');

  MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;

    if (db.s.options.dbName === process.env.CMS_SOURCE_DB) {
      updater.updateOtherPages(page);
    }
  });
});


Page.defaultColumns = 'title, state|20%';
Page.register();

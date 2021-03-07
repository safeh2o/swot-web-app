var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'pages';
	locals.filters = {
		page: req.params.page,
	};
	locals.data = {
		page: [],
	};

	// Load the current page
	view.on('init', function (next) {

		var q = keystone.list('Page').model.findOne({
			state: 'published',
			slug: locals.filters.page,
		});

		q.exec(function (err, result) {
			locals.data.page = result;
			next(err);
		});

	});

	// Render the view
	view.render('page');
};

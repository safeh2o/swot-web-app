var keystone = require('keystone');
const User = keystone.list('User');
var Types = keystone.Field.Types;

/**
 * Welcome Model
 * =============
 */

var Welcome = new keystone.List('Welcome', {
});

Welcome.add(
	{
		user: { type: Types.Relationship, ref: 'User', required: true, initial: true, noedit: true },
		createdAt: { type: Date, default: Date.now, noedit: true },
		content: { type: Types.Html, initial: false, required: false, height: 400, wysiwyg: true }
	}
);

Welcome.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.content || this.updatingContent)
		next();
	else {
		throw new Error("Cannot modify email already sent, please refresh the page");
	}
});

Welcome.schema.post('save', function () {
	if (this.wasNew) {
		this.populate('user').execPopulate()
		.then((welcome) => {
			welcome.sendNotificationEmail();
			welcome.user.welcome = true;
			welcome.user.save();
		});
	}
});

function updateContent(welcome) {
	return (err, {html, text}) => {
		if (err) {
			console.error(err);
			return;
		}
		else {
			welcome.updatingContent = true;
			welcome.content = html;
			welcome.save();
		}
	}
}

Welcome.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the welcome email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	let locals = {
		host: process.env.WEB_URL || 'live.safeh2o.app',
		support: process.env.SUPPORT_EMAIL || process.env.ADMIN_EMAIL,
		welcome: this
	}

	locals.host = locals.host.includes('http') ? locals.host : 'https://' + locals.host;
	locals.instructionsUrl = locals.host + (locals.host.endsWith('/') ? '' : '/') + 'pages/instructions';
	
	new keystone.Email({
		templateName: 'welcome-notification',
		transport: 'mailgun',
	}).render(locals, updateContent(this));

	new keystone.Email({
		templateName: 'welcome-notification',
		transport: 'mailgun',
	}).send({
		to: this.user.email,
		from: `SWOT Accounts <${process.env.ACCOUNTS_ADMIN_EMAIL || process.env.ADMIN_EMAIL}>`,
		subject: 'Welcome to SWOT',
		...locals
	}, callback);


};

Welcome.defaultSort = '-createdAt';
Welcome.defaultColumns = 'user, createdAt';
Welcome.register();

var keystone = require('keystone');
const User = keystone.list('User');
var Types = keystone.Field.Types;

/**
 * Welcome Model
 * =============
 */

var Welcome = new keystone.List('Welcome', {
	noedit: true,
});

Welcome.add(
	{
		user: { type: Types.Relationship, ref: 'User', required: true, initial: true },
		createdAt: { type: Date, default: Date.now },
	}
);

Welcome.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
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

	new keystone.Email({
		templateName: 'welcome-notification',
		transport: 'mailgun',
	}).send({
		to: this.user.email,
		from: `SWOT Accounts <${process.env.ACCOUNTS_ADMIN_EMAIL || process.env.ADMIN_EMAIL}>`,
		support: process.env.SUPPORT_EMAIL || process.env.ADMIN_EMAIL,
		subject: 'Welcome to SWOT',
		host: process.env.WEB_URL || 'live.safeh2o.app',
		welcome: this,
	}, callback);


};

Welcome.defaultSort = '-createdAt';
Welcome.defaultColumns = 'user, createdAt';
Welcome.register();

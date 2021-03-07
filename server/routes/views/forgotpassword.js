var keystone = require('keystone'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	
	view.on('post', function(next) {
		
		if (!req.body.email) {
			req.flash('error', "Please enter an email address.");
			return next();
		}

		User.model.findOne().where('email', req.body.email).exec(function(err, user) {
			if (err) return next(err);
			if (!user) {
				// req.flash('error', "Sorry, That email address is not registered in our application.");
                req.flash('success', 'Thanks! If there is a SWOT account associated with that email address, you\'ll get an email with a reset password link shortly.');
                return next();
            }
            
            let host = process.env.WEB_URL || 'live.safeh2o.app';
            
            host = host.includes('http') ? host : ('https://' + host);
            host += host.endsWith('/') ? '' : '/';
            
            user.resetPasswordKey = keystone.utils.randomString([16,24]);
            user.save(function(err) {
                if (err) return next(err);
                new keystone.Email({'templateName': 'forgotpassword', 'transport': 'mailgun'}).send({
                    user: user,
                    host: host,
                    link: 'resetpassword/' + user.resetPasswordKey,
                    subject: 'Reset your Password for SWOT',
		            'o:tracking': false,
                    to: user.email,
                    from: {
                        name: process.env.FROM_ADDRESS,
                        email: process.env.FROM_ADDRESS,
                    }
                }, function(err) {
                    if (err) {
                        console.error(err);
                        req.flash('error', 'Error sending reset password email!');
                        next();
                    } else {
                        req.flash('success', 'Thanks! If there is a SWOT account associated with that email address, you\'ll get an email with a reset password link shortly.');
                    }
                    next();
                });
            }); 

		});
		
	});
	
	view.render('forgotpassword');
	
}
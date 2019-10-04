const keystone = require('keystone');
const User = keystone.list('User');

/**
 * Update current user profile
 */
exports.update = async function(req, res) {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.status(400).send('Name and email are required fields');
    return;
  }
  if (req.body.password1 || req.body.password2) {
    if ( (req.body.password1 && !req.body.password2) || (req.body.password2 && !req.body.password1) ) {
      res.status(400).send('Both password fields are required');
      return;
    }

    if (req.body.password1 !== req.body.password2) {
      res.status(400).send('Passwords do not match');
      return;
    }

    if (req.body.password1.length < 6 || req.body.password2.length < 6) {
      res.status(400).send('Password should be minimum 6 characters');
      return;
    }
  }

  User.model.findOne({ _id: req.user.id}, function(err, user) {
    if (err) {
      res.status(400).send('Error occurred during search: ' + err);
      return;
    } else {

      if (req.body.password1 && req.body.password2) {
        user.password = req.body.password1;
      }

      user.name.first = req.body.firstName;
      user.name.last = req.body.lastName;
      user.email = req.body.email;

      user.save(function(saveError) {
        if (saveError) {
          res.status(400).send('Error occurred during update: ' + err);
          return;
        }
        res.send({status: 'ok'});
      });
    }
  });

}
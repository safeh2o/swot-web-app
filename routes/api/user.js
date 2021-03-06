const keystone = require('keystone');
const User = keystone.list('User');
const Enquiry = keystone.list('Enquiry');
const dataService = require('../../utils/data.service');

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

exports.createFromEnquiry = async function(req, res) {
  if (!req.user) {
      res.redirect('/admin/signin', 302);
      return false;
  }

  if (!req.user.isAdmin) {
      res.status(403).send('Insufficient Privilleges');
      return false;
  }

  if (!req.query.enquiryId) {
    res.status(400).send('Invalid enquiry id');
    return false;
  }

  const enquiry = await Enquiry.model.findOne({ '_id': req.query.enquiryId }).exec();
  
  if (!enquiry) {
    res.status(404).send();
    return false;
  }

  const userExists = await User.model.findOne({'email': enquiry.email}).exec();
  if (userExists) {
    res.status(409).send(`User already exists with the email ${enquiry.email}.`);
    return;
  }

  const demoProject = await dataService.createIfNotExists('Project', 'Demo Project');
  const demoSite = await dataService.createIfNotExists('Fieldsite', 'Demo Site');
  const demoCountry = await dataService.createIfNotExists('Country', 'Demo Country');

  // ensure demo site is in demo project
  demoProject.update({$addToSet: {fieldsites: demoSite.id}}).exec();
  // ensure demo project is in demo country
  demoCountry.update({$addToSet: {projects: demoProject.id}}).exec();

  // create user from enquiry with first name, last name and email, and add to demo project
  const user = await User.model.create({
    'name': enquiry.name,
    'email': enquiry.email,
    'password': enquiry.email,
    'isAdmin': false,
    'welcome': true,
    'projects': [demoProject]
  });

  res.send(`Created new user with email ${user.email} in project ${demoProject.name}`);
  return true;

}

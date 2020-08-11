var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
  password: { type: Types.Password, initial: true, required: true },
  welcome: { type: Types.Boolean, label: 'Send Welcome Email', noedit: true, initial: true }
}, 'Permissions', {
  isAdmin: { type: Types.Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

User.schema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

User.schema.post('save', function () {
  if (!this.wasNew || !this.welcome) return;

  var Welcome = keystone.list('Welcome');
  Welcome.model.create({user: this});
});

/**
 * Relationships
 */
User.relationship({ ref: 'Dataset', path: 'dataset', refPath: 'user' });
User.relationship({ ref: 'Project', path: 'projects', refPath: 'users' });
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();

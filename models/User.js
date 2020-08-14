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
  welcome: { type: Types.Boolean, label: 'Send Welcome Email', noedit: true, initial: true },
  projects: { type: Types.Relationship, label: 'Assigned Projects', ref: 'Project', many: true, initial: true, hidden: true, noedit: true, index: false }
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
  if (!this.wasNew) return;

  var Project = keystone.list('Project');
  Project.model.updateMany({ _id: {$in: this.projects} }, { $push: {'users': this._id} }, (err, res) => {
    if (err) {
      console.error(`Error adding user ${this.name.full} to projects during creation.`, err);
      return;
    }
  });

  if (this.welcome) {
    var Welcome = keystone.list('Welcome');
    Welcome.model.create({user: this});
  }
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

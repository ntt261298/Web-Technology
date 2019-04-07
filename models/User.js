const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    // required: true
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  birthday: {
    type: String
  },
  address: {
    type: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);

const mongoose = require('mongoose');

// schema y modelo de usuario
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

const mongoose = require('mongoose');

// schema y modelo de usuario
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  answered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  correctAnswers: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

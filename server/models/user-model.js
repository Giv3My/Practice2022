const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

module.exports = model('User', UserSchema);
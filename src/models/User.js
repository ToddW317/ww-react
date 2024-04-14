const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Password will be stored as plain text
});

// Handle duplicate username errors
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Username already exists. Please choose another one.'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

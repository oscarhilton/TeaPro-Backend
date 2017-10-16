const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  firstName: String,
  lastName: String,
  gender: String,
  profileImage: String
});

mongoose.model('users', userSchema);

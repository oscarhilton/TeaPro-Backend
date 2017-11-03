const mongoose = require('mongoose');
const { Schema } = mongoose;

const uploadsSchema = new Schema({
  title: String,
  path: String,
  type: String,
  size: Number
});

mongoose.model('Uploads', uploadsSchema);

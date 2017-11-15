const mongoose = require('mongoose');
const { Schema } = mongoose;

const uploadsSchema = new Schema({
  title: String,
  path: String,
  type: String,
  size: Number,
  uploadDate: Date,
  latitude: Number,
  longitude: Number,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Uploads', uploadsSchema);

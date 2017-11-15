'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var uploadsSchema = new Schema({
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
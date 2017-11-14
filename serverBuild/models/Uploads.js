'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var uploadsSchema = new Schema({
  title: String,
  path: String,
  type: String,
  size: Number
});

mongoose.model('Uploads', uploadsSchema);
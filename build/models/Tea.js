'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var teaSchema = new Schema({
  title: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  score: Number,
  description: String,
  caffeine: String,
  origin: String,
  steeptime: String
});

mongoose.model('Tea', teaSchema);
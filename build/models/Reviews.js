'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var teaSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 0, max: 5 },
  tea: { type: Schema.Types.ObjectId, ref: 'Tea' },
  dateMade: { type: Date, default: Date.now }
});

mongoose.model('Review', teaSchema);
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
  steeptime: String,
  flavoured: Boolean,
  moods: [{ type: Schema.Types.ObjectId, ref: 'Moods' }],
  health: [{ type: Schema.Types.ObjectId, ref: 'Health' }]
});

mongoose.model('Tea', teaSchema);
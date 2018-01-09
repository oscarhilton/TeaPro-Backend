'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var teaSchema = new Schema({
  title: String,
  description: String,
  teas: [{ type: Schema.Types.ObjectId, ref: 'Tea' }]
});

mongoose.model('Collection', teaSchema);
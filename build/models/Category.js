'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categorySchema = new Schema({
  title: String,
  image: { type: Schema.Types.ObjectId, ref: 'Uploads' },
  teas: [{ type: Schema.Types.ObjectId, ref: 'Tea' }],
  background: String
});

mongoose.model('Category', categorySchema);
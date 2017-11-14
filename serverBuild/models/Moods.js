'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var moodsSchema = new Schema({
  title: String,
  description: String,
  image: { type: Schema.Types.ObjectId, ref: 'Uploads' },
  teas: [{ type: Schema.Types.ObjectId, ref: 'Tea' }]
});

mongoose.model('Moods', moodsSchema);
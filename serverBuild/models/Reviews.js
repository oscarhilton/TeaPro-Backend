'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reviewSchema = new Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 0, max: 5 },
  tea: { type: Schema.Types.ObjectId, ref: 'Tea' },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  image: { type: Schema.Types.ObjectId, ref: 'Uploads' }
});

mongoose.model('Review', reviewSchema);
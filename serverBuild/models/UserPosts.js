'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userPostSchema = new Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('UserPost', userPostSchema);
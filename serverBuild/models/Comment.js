'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  parent: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Comment', commentSchema);
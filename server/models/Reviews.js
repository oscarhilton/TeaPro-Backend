const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0}
});

const reviewSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 0, max: 5 },
  tea: { type: Schema.Types.ObjectId, ref: 'Tea' },
  dateMade: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [commentSchema]
});

mongoose.model('Review', reviewSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const teaSchema = new Schema({
  title: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rating: { type: Number, min: 0, max: 5 }, s
});

mongoose.model('Review', teaSchema);
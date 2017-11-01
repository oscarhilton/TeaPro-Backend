const mongoose = require('mongoose');
const { Schema } = mongoose;

const teaSchema = new Schema({
  title: String,
  content: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rating: { type: Number, min: 0, max: 5 },
  tea: { type: Schema.Types.ObjectId, ref: 'Tea' },
  dateMade: { type: Date, default: Date.now }
});

mongoose.model('Review', teaSchema);

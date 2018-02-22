const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
  title: String,
  tea: { type: Schema.Types.ObjectId, ref: 'Tea' },
  score: Number,
  description: String,
  flavoured: Boolean,
  health: [{ type: Schema.Types.ObjectId, ref: 'Health' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

brandSchema.index({title: 'text', description: 'text', category: 'text'});

mongoose.model('Brand', brandSchema);

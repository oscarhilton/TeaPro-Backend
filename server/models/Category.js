const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  image: { type: Schema.Types.ObjectId, ref: 'Uploads' },
  teas: [{ type: Schema.Types.ObjectId, ref: 'Tea' }],
  background: String
});

mongoose.model('Category', categorySchema);

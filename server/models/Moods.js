const mongoose = require('mongoose');
const { Schema } = mongoose;

const moodsSchema = new Schema({
  title: String,
  description: String,
  imageURI: String,
  teas: [{ type: Schema.Types.ObjectId, ref: 'Tea' }]
})

mongoose.model('Moods', moodsSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const teaSchema = new Schema({
  title: String,
  description: String,
  teas: [{ type: Schema.Types.ObjectId, ref: 'Tea' }]
});

mongoose.model('Collection', teaSchema);

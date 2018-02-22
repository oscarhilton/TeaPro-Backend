const mongoose = require('mongoose');
const { Schema } = mongoose;

const teaSchema = new Schema({
  title: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  score: Number,
  description: String,
  caffeine: String,
  origin: String,
  steeptime: String,
  flavoured: Boolean,
  moods: [
    {
      mood: { type: Schema.Types.ObjectId, ref: 'Moods' },
      score: { type: Number, min: 0, max: 100 }
    }
  ],
  health: [{ type: Schema.Types.ObjectId, ref: 'Health' }],
  // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], TODO: MOVE REVIEWS TO BRANDS
  userImages: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
  brands: { type: Schema.Types.ObjectId, ref: 'Brands' },
});

teaSchema.index({title: 'text', description: 'text', category: 'text'});

teaSchema.statics.getReviewTotal = function(_id, cb) {
  return this.findOne({ _id }, (err, tea) => {
    cb(tea['reviews'].length);
  });
}

mongoose.model('Tea', teaSchema);

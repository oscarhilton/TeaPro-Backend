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
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

// teaSchema.methods.findSimiarCateogory = function(cb) {
//   return this.model('Tea').find({ category: })
// }

teaSchema.index({title: 'text'});

teaSchema.statics.getReviewTotal = function(id, cb) {
  return this.findOne({ _id: id }, (err, tea) => {
    cb(tea['reviews'].length);
  });
}

mongoose.model('Tea', teaSchema);

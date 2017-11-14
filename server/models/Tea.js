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

teaSchema.index({title: 'text', description: 'text', category: 'text'});

teaSchema.statics.getReviewTotal = function(_id, cb) {
  return this.findOne({ _id }, (err, tea) => {
    cb(tea['reviews'].length);
  });
}

// teaSchema.virtual('rating').get(function() {
//   const numberOfReviews = this.reviews.length;
//   let ratings = [];
//   for (var i = 0; i < numberOfReviews; i++) {
//     ratings.push(this.reviews[i].rating);
//   };
//   const sum = ratings.reduce((a, b) => a + b, 0);
//   const average = sum / numberOfReviews;
//   return Math.round(average * 10) / 10;
// });

mongoose.model('Tea', teaSchema);

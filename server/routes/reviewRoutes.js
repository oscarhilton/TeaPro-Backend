const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Tea = mongoose.model('Tea');

// Tea.find({}, (err, teas) => {
//   teas.forEach((tea) => {
//     tea.reviews = [];
//     tea.score = 0;
//     tea.save();
//   })
// })

module.exports = app => {
  app.post('/api/teas/:teaId/reviews/add/:userId', (req, res) => {
    Tea.findOne({ _id: req.params.teaId }, (err, tea) => {
          const { newReview } = req.body;
          const { titleText, bodyText, starCount } = newReview;
          const newReviewEntry = new Review({
            title: titleText,
            content: bodyText,
            author: req.params.userId,
            rating: starCount,
            tea
          });
          newReviewEntry.save();
          tea.reviews.push(newReviewEntry);
          const score = tea.score ? tea.score : 0;
          tea.score = score + starCount;
          tea.save((err) => {
            if (err) { throw err };
            tea.populate({
              path: 'reviews',
              populate: {
                path: 'author'
              }
            }, (err) => {
              console.log(tea, 'TEAAAA');
              res.send({ reviews: tea.reviews, score: tea.score });
            });
          });
          // console.log('NEW REVIEW ', newReviewEntry, ' TO THIS TEA ', tea, ' BY THIS USER', req.params.userId);
    });
  });

  app.post('/api/teas/:teaId/reviews/:reviewId/delete', (req, res) => {
    Review.findOne({ _id: reviewId }).remove().exec();
  });

  app.get('/api/teas/:teaId/reviews/all', (req, res) => {
    Tea.findOne({ _id: req.params.teaId }).populate('reviews').exec( (err, tea) => {
      console.log(tea.reviews);
      res.send(tea.reviews);
    });
  });

  // app.get('/api/teas/:teaId/reviews/rating', (req, res) => {
  //   Tea.findOne({ _id: req.params.teaId }, 'reviews')
  //      .populate({ path: 'reviews',  populate: 'rating', select: 'rating' })
  //      .exec((err, tea) => {
  //        if (err) { throw err };
  //        console.log(tea.rating, tea);
  //        res.send(tea.rathing);
  //      });
  // });
}

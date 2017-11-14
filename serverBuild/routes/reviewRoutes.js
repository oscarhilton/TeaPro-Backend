'use strict';

var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Tea = mongoose.model('Tea');

module.exports = function (app) {
  app.post('/api/teas/:teaId/reviews/add/:userId', function (req, res) {
    Tea.findOne({ _id: req.params.teaId }, function (err, tea) {
      var _req$body = req.body,
          newReview = _req$body.newReview,
          userId = _req$body.userId;
      var titleText = newReview.titleText,
          bodyText = newReview.bodyText,
          starCount = newReview.starCount;

      var newReviewEntry = new Review({
        title: titleText,
        content: bodyText,
        author: userId,
        rating: starCount,
        tea: tea
      });
      newReviewEntry.save();
      tea.reviews.push(newReviewEntry);
      var score = tea.score ? tea.score : 0;
      tea.score = score + starCount;
      tea.save();
      console.log('NEW REVIEW ', newReviewEntry, ' TO THIS TEA ', tea);
      res.send(tea);
    });
  });

  app.post('/api/teas/:teaId/reviews/:reviewId/delete', function (req, res) {
    Review.findOne({ _id: reviewId }).remove().exec();
  });

  app.get('/api/teas/:teaId/reviews/all', function (req, res) {
    Tea.findOne({ _id: req.params.teaId }).populate('reviews').exec(function (err, tea) {
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
};
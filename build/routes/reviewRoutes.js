'use strict';

var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Tea = mongoose.model('Tea');

module.exports = function (app) {
  app.post('/api/teas/:teaId/reviews/add', function (req, res) {
    Tea.findOne({ _id: teaId }, function (err, tea) {
      var newReview = new Review({
        title: req.body.review.title,
        content: req.body.review.content,
        author: req.body.review.author,
        rating: req.body.review.rating,
        tea: tea
      });
      newReview.save();
      tea.reviews.push(newReview);
      tea.save();
    });
  });

  app.post('/api/teas/:teaId/reviews/:reviewId/delete', function (req, res) {
    Review.findOne({ _id: reviewId }).remove().exec();
  });

  app.get('/api/teas/:teaId/reviews/all', function (req, res) {
    Tea.findOne({ _id: teaId }, function (err, tea) {
      res.send(tea.reviews);
    });
  });
};
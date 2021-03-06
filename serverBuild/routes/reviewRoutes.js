'use strict';

var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Tea = mongoose.model('Tea');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

// Review.find({}, (err, review) => {
//   review.forEach((review) => {
//     review.createdAt = new Date();
//     review.save();
//   })
// })


module.exports = function (app) {
  app.post('/api/teas/:teaId/reviews/add/:userId', function (req, res) {
    console.log('NEW REVIEW START');
    Tea.findOne({ _id: req.params.teaId }, function (err, tea) {
      var _req$body = req.body,
          newReview = _req$body.newReview,
          imageUpload = _req$body.imageUpload;
      var titleText = newReview.titleText,
          bodyText = newReview.bodyText,
          starCount = newReview.starCount;

      var newReviewEntry = new Review({
        title: titleText,
        content: bodyText,
        createdAt: new Date(),
        author: req.params.userId,
        rating: starCount,
        upvotes: 0,
        downvotes: 0,
        comments: [],
        tea: tea,
        image: imageUpload
      });
      newReviewEntry.save(function (err) {
        if (err) {
          throw err;
        };
        tea.reviews.push(newReviewEntry);
        var score = tea.score ? tea.score : 0;
        tea.score = score + starCount;
        tea.save(function (err) {
          if (err) {
            throw err;
          };
          User.findOne({ _id: req.params.userId }, function (err, user) {
            if (err) {
              throw err;
            };
            if (user) {
              user.reviews.push(newReviewEntry);
              user.save(function (err) {
                tea.populate({
                  path: 'reviews',
                  populate: {
                    path: 'author'
                  }
                }).populate({
                  path: 'reviews',
                  populate: {
                    path: 'image'
                  }
                }).sort({ createdAt: -1 }, function (err) {
                  res.send({ reviews: tea.reviews, score: tea.score });
                });
              });
            }
          });
        });
      });
    });
  });

  app.post('/api/reviews/:reviewId/upvote', function (req, res) {
    Review.findOne({ _id: reviewId }, function (err, review) {
      review.upvotes++;
      review.save();
    });
  });

  app.post('/api/teas/:teaId/reviews/:reviewId/delete', function (req, res) {
    Review.findOne({ _id: reviewId }).remove().exec();
  });

  app.get('/api/teas/:teaId/reviews/all', function (req, res) {
    console.log('REVIEWS CALLED');
    Tea.findOne({ _id: req.params.teaId }).populate({
      path: 'reviews',
      populate: {
        path: ['author', 'image']
      }
    }).exec(function (err, tea) {
      console.log(tea.reviews);
      res.send(tea.reviews);
    });
  });

  app.post('/api/reviews/:reviewId/comments', function (req, res) {
    Review.findOne({ _id: req.params.reviewId }, function (err, review) {
      if (err) {
        throw err;
      };
      var newComment = new Comment({
        author: req.body.userId,
        content: req.body.content,
        parent: reviewId,
        createdAt: new Date(),
        upvotes: 0,
        downvotes: 0
      });
      review.comments.push(newComment);
      review.save();
    });
  });
};
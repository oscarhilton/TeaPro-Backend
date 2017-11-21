const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Tea = mongoose.model('Tea');
const Comment = mongoose.model('Comment');

Review.find({}, (err, review) => {
  review.forEach((review) => {
    review.upvotes = 0;
    review.downvotes = 0;
    review.save();
  })
})

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
            upvotes: 0,
            downvotes: 0,
            comments: [],
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

  app.post('/api/reviews/:reviewId/:comment/comments/:userId', (req, res) => {
    Review.findOne({ _id: req.params.reviewId }, (err, review) => {
      if (err) { throw err };
      const newComment = new Comment({
        author: req.params.userId,
        comment: req.params.comment,
        upvotes: 0,
        downvotes: 0
      })
      review.comments.push(newComment);
      review.save();
      console.log(review);
    });
  });
}

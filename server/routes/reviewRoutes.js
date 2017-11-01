const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Tea = mongoose.model('Tea');

module.exports = app => {
  app.post('/api/teas/:teaId/reviews/add', (req, res) => {
    Tea.findOne({ _id: teaId }, (err, tea) => {
      const newReview = new Review({
        title: req.body.review.title,
        content: req.body.review.content,
        author: req.body.review.author,
        rating: req.body.review.rating,
        tea
      });
      newReview.save();
      tea.reviews.push(newReview);
      tea.save();
    });
  });

  app.post('/api/teas/:teaId/reviews/:reviewId/delete', (req, res) => {
    Review.findOne({ _id: reviewId }).remove().exec();
  });

  app.get('/api/teas/:teaId/reviews/all', (req, res) => {
    Tea.findOne({ _id: teaId }, (err, tea) => {
      res.send(tea.reviews);
    });
  });
}

const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Tea = mongoose.model('Tea');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

// Review.find({}, (err, review) => {
//   review.forEach((review) => {
//     review.createdAt = new Date();
//     review.save();
//   })
// })


module.exports = app => {
  app.post('/api/teas/:teaId/reviews/add/:userId', (req, res) => {
    console.log('NEW REVIEW START');
    Tea.findOne({ _id: req.params.teaId }, (err, tea) => {
          const { newReview, imageUpload } = req.body;
          const { titleText, bodyText, starCount } = newReview;
          const newReviewEntry = new Review({
            title: titleText,
            content: bodyText,
            createdAt: new Date(),
            author: req.params.userId,
            rating: starCount,
            upvotes: 0,
            downvotes: 0,
            comments: [],
            tea,
            image: imageUpload
          });
          newReviewEntry.save((err) => {
            if (err) { throw err };
            tea.reviews.push(newReviewEntry);
            const score = tea.score ? tea.score : 0;
            tea.score = score + starCount;
            tea.save((err) => {
              if (err) { throw err };
              User.findOne({ _id: req.params.userId }, (err, user) => {
                if (err) { throw err };
                if (user) {
                  user.reviews.push(newReviewEntry);
                  user.save((err) => {
                    tea
                    .populate({
                      path: 'reviews',
                      populate: {
                        path: 'author'
                      }
                    })
                    .populate({
                      path: 'reviews',
                      populate: {
                        path: 'image'
                      }
                    })
                    .sort({ createdAt: -1 }, (err) => {
                      res.send({ reviews: tea.reviews, score: tea.score });
                    });
                  });
                }
              });
            });
          });
        });
  });

  app.post('/api/reviews/:reviewId/upvote', (req, res) => {
    Review.findOne({ _id: reviewId }, (err, review) => {
      review.upvotes++;
      review.save();
    });
  })

  app.post('/api/teas/:teaId/reviews/:reviewId/delete', (req, res) => {
    Review.findOne({ _id: reviewId }).remove().exec();
  });

  app.get('/api/teas/:teaId/reviews/all', (req, res) => {
    console.log('REVIEWS CALLED');
    Tea.findOne({ _id: req.params.teaId }).populate({
      path: 'reviews',
      populate: {
        path: ['author', 'image']
      }
    }).exec( (err, tea) => {
      console.log(tea.reviews);
      res.send(tea.reviews);
    });
  });

  app.post('/api/reviews/:reviewId/comments', (req, res) => {
    Review.findOne({ _id: req.params.reviewId }, (err, review) => {
      if (err) { throw err };
      const newComment = new Comment({
        author: req.body.userId,
        content: req.body.content,
        parent: reviewId,
        createdAt: new Date(),
        upvotes: 0,
        downvotes: 0
      })
      review.comments.push(newComment);
      review.save();
    });
  });
}

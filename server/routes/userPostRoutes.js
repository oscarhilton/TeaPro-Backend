const mongoose = require('mongoose');
const Post = mongoose.model('UserPost');

module.exports = app => {
  app.post('/api/user/posts/:user', (req, res) => {
    const { postContent } = req.body;
    const newPostEntry = new Post({
      content: postContent,
      createdAt: new Date(),
      author: req.params.user,
      upvotes: 0,
      comments: []
    });
    newPostEntry.save((err) => {
      if (!err) {
        console.log(newPostEntry);
        res.send(newPostEntry);
      } else {
        res.send('failed to save new post - ', err);
      }
    });
  });

  app.get('/api/user/posts/hot', (req, res) => {
    Post.find()
        .populate({ path: 'author', select: 'name' })
        .sort({ upvotes: -1 })
        .limit(3)
        .exec((err, posts) => {
          res.send(posts);
        })
  });

  app.post('/api/user/posts', (req, res) => {
    console.log(req.body);
    Post.find({ author: { $in: req.body.followers }})
        .populate({ path: 'author', select: 'name' })
        .sort({ createdAt: -1 })
        .limit(3)
        .exec((err, posts) => {
          res.send(posts);
        })
  });
};

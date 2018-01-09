'use strict';

var mongoose = require('mongoose');
var Post = mongoose.model('UserPost');

module.exports = function (app) {
  app.post('/api/user/posts/:user', function (req, res) {
    var postContent = req.body.postContent;

    var newPostEntry = new Post({
      content: postContent,
      createdAt: new Date(),
      author: req.params.user,
      upvotes: 0,
      comments: []
    });
    newPostEntry.save(function (err) {
      if (!err) {
        console.log(newPostEntry);
        res.send(newPostEntry);
      } else {
        res.send('failed to save new post - ', err);
      }
    });
  });

  app.get('/api/user/posts/hot', function (req, res) {
    Post.find().populate({ path: 'author', select: ['name', 'avatar'] }).sort({ upvotes: -1 }).limit(3).exec(function (err, posts) {
      res.send(posts);
    });
  });

  app.post('/api/user/posts', function (req, res) {
    console.log(req.body);
    Post.find({ author: { $in: req.body.followers } }).populate({ path: 'author', select: ['name', 'avatar'] }).sort({ createdAt: -1 }).limit(3).exec(function (err, posts) {
      res.send(posts);
    });
  });
};
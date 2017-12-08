'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tea = mongoose.model('Tea');
var Category = mongoose.model('Category');

User.find({}, function (err, users) {
  users.forEach(function (user) {
    user.followers = [];
    user.following = [];
    user.save();
  });
  console.log('Users stripped of followers');
});

module.exports = function (app) {
  app.get('/api/test', function (req, res) {
    User.getCupboardTeas('some text', function (err) {
      console.log(err);
    });
  });

  app.get('/api/user/:user/cupboard/total', function (req, res) {
    User.findOne({ _id: req.params.user }, function (req, res) {
      if (err) {
        throw err;
      };
      User.getCupboardTotal(user._id, function (total) {
        res.send(total);
      });
    });
  });

  app.post('/api/user/:user/cupboard/add/:teaId', function (req, res) {
    User.findOne({ _id: req.params.user }, function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        if (user.cupboard.indexOf(req.params.teaId) > -1) {
          res.send('Already got one');
        } else {
          Tea.findOne({ _id: req.params.teaId }, function (err, tea) {
            if (err) {
              throw err;
            };
            user.cupboard.push(tea);
            user.save();
          });
        }
      };
    });
  });

  app.get('/api/user/:user/onboardstatus', function (req, res) {
    User.checkOnBoarding(req.params.user, function (onBoard) {
      res.send(onBoard);
    });
  });

  app.post('/api/user/:user/onboardsubmit', function (req, res) {
    User.findOne({ _id: req.params.user }, function (err, user) {
      user.chosenMoods = req.body.moods;
      user.chosenCategories = req.body.categories;
      user.save();
      res.end();
    });
  });

  app.post('/api/user/:user/cupboard', function (req, res) {
    User.findOne({ _id: req.params.user }, 'cupboard').populate({
      path: 'cupboard',
      select: ['title', 'category', 'score', 'reviews'],
      populate: {
        path: 'category',
        select: 'background'
      }
    }).exec(function (err, user) {
      if (err) {
        throw err;console.log(err);
      };
      if (user) {
        res.send(user.cupboard);
      } else {
        console.log('No user??');
      }
    });
  });

  app.post('/api/user/wishlist/add', function (req, res) {
    User.findOne({ _id: req.body.userId }, function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        if (user.wishlist.indexOf(req.body.teaId) > -1) {
          res.send('Already got one');
        } else {
          Tea.findOne({ _id: req.body.teaId }, function (err, tea) {
            if (err) {
              throw err;
            };
            user.wishlist.push(tea);
            user.save();
          });
        }
      };
    });
  });

  app.get('/api/user/:userId/wishlist/get', function (req, res) {
    User.findOne({ _id: req.params.userId }).populate({
      path: 'wishlist',
      populate: {
        path: 'category',
        select: 'background'
      }
    }).exec(function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        res.send(user.wishlist);
      }
    });
  });

  app.get('/api/user/:user/discover/categories', function (req, res) {
    User.findOne({ _id: req.params.user }, ['chosenCategories', 'chosenMoods']).populate({
      path: 'chosenCategories',
      select: 'title'
    }).exec(function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        if (user.chosenCategories && user.chosenCategories.length > 0) {
          (function () {
            var toSend = [];

            var _loop = function _loop(i) {
              Category.findOne({ _id: user.chosenCategories[i] }).populate({
                path: 'teas',
                select: ['title', 'category', 'score', 'reviews'],
                options: {
                  sort: {
                    'score': -1
                  }
                },
                populate: {
                  path: 'category',
                  select: 'background'
                }
              }).exec(function (err, cat) {
                toSend.push(cat);
                if (i === user.chosenCategories.length - 1) {
                  res.send(toSend);
                  // console.log(toSend);
                }
              });
            };

            for (var i = 0; i < user.chosenCategories.length; i++) {
              _loop(i);
            }
          })();
        } else {
          res.end();
        }
      } else {
        console.log('NO USER');
      }
    });
  });

  app.get('/api/user/view/:userId', function (req, res) {
    User.findOne({ _id: req.params.userId }, ['name', 'avatar', 'followers', 'following'], function (err, user) {
      console.log(user);
      res.send(user);
    });
  });

  app.post('/api/user/:userToFollow/follow', function (req, res) {
    User.findOne({ _id: req.body.authUser }, function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        var userToFollow = req.params.userToFollow;

        if (user.following.indexOf(userToFollow) < 0) {
          user.following.push(userToFollow);
          user.save(function (err) {
            if (err) {
              throw err;
            };
            User.findOne({ _id: req.params.userToFollow }, function (err, otherUser) {
              if (err) {
                throw err;
              };
              if (otherUser.followers.indexOf(user._id) < 0) {
                otherUser.followers.push(user);
                otherUser.save(function (err) {
                  if (err) {
                    throw err;
                  };
                  console.log('Success!');
                  res.send('success');
                });
              } else {
                console.log('ALREADY FOLLOWING');
              }
            });
          });
        } else {
          console.log('ALREADY GOT ONE');
        }
      }
    });
  });
};
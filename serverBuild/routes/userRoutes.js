'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tea = mongoose.model('Tea');
var Category = mongoose.model('Category');
var Notification = mongoose.model('Notification');

User.find({}, function (err, users) {
  users.forEach(function (user) {
    user.profileBio = 'I love tea! Tea is life!';
    user.save();
  });
  console.log('Updated Bios');
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

  app.get('/api/user/:user/notifications', function (req, res) {
    Notification.find({ user: { $in: req.params.user } }).sort({ timestamp: -1 }).exec(function (err, notes) {
      if (err) {
        throw err;
      };
      res.send(notes);
    });
  });

  app.post('/api/user/:user/cupboard/add/:teaId', function (req, res) {
    console.log('hello');
    // User.findOne({ _id: mongoose.Types.ObjectId(req.params.user)}, (err, user) => {
    //   if (err) { throw err };
    //   console.log(user);
    //   // if (user) {
    //   //   if (user.cupboard.indexOf(req.params.teaId) > -1) {
    //   //     res.send('Already got one');
    //   //   } else {
    //   //     Tea.findOne({ _id: req.params.teaId }, (err, tea) => {
    //   //       if (err) { throw err };
    //   //       if (tea) {
    //   //         user.cupboard.push(tea);
    //   //         user.save((err) => {
    //   //           console.log(user._id);
    //   //           if (!err) {
    //   //             const note = new Notification({
    //   //               message: `You added ${req.body.teaTitle} to your cupboard`,
    //   //               timestamp: new Date(),
    //   //               reference: tea._id,
    //   //               // user: user._id
    //   //             });
    //   //             note.save((err) => {
    //   //               if (!err) {
    //   //                 console.log(note);
    //   //                 res.send(note);
    //   //               }
    //   //             });
    //   //           }
    //   //         });
    //   //       } else {
    //   //         throw('no tea found of that ID.');
    //   //       }
    //   //     });
    //   //   }
    //   // };
    // })
  });

  app.get('/api/user/:user/onboardstatus', function (req, res) {
    User.checkOnBoarding(req.params.user, function (onBoard) {
      console.log(onBoard);
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
      select: ['title', 'category', 'score', 'reviews', 'flavoured', 'following'],
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
    User.findOne({ _id: req.params.user }, ['chosenCategories', 'chosenMoods']).exec(function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        if (user.chosenCategories && user.chosenCategories.length > 0) {
          Category.find({ _id: { $in: user.chosenCategories } }).populate({
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
          }).exec(function (err, cats) {
            if (err) {
              throw err;
            };
            if (cats) {
              res.send(cats);
            }
          });
        } else {
          console.log('NO USER');
        }
      };
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

  app.post('/api/users', function (req, res) {
    User.find({ _id: { $in: req.body.userList } }, ['name', 'avatar'], function (err, users) {
      if (err) {
        throw err;
      };
      if (users) {
        res.send(users);
      }
    });
  });
};
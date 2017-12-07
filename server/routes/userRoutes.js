const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tea = mongoose.model('Tea');
const Category = mongoose.model('Category');

User.find({}, (err, users) => {
  users.forEach((user) => {
    user.followers = [];
    user.following = [];
    user.save();
  })
  console.log('Users stripped of followers');
});

module.exports = app => {
  app.get('/api/test', (req, res) => {
    User.getCupboardTeas('some text', (err) => {
      console.log(err);
    });
  })

  app.get('/api/user/:user/cupboard/total', (req, res) => {
    User.findOne({ _id: req.params.user }, (req, res) => {
      if (err) { throw err };
      User.getCupboardTotal(user._id, (total) => {
        res.send(total);
      });
    });
  });

  app.post('/api/user/:user/cupboard/add/:teaId', (req, res) => {
    User.findOne({ _id: req.params.user }, (err, user) => {
      if (err) { throw err };
      if (user) {
        if (user.cupboard.indexOf(req.params.teaId) > -1) {
          res.send('Already got one');
        } else {
          Tea.findOne({ _id: req.params.teaId }, (err, tea) => {
            if (err) { throw err };
            user.cupboard.push(tea);
            user.save();
          });
        }
      };
    })
  });

  app.get('/api/user/:user/onboardstatus', (req, res) => {
    User.checkOnBoarding(req.params.user, (onBoard) => {
      res.send(onBoard);
    })
  });

  app.post('/api/user/:user/onboardsubmit', (req, res) => {
    User.findOne({ _id: req.params.user }, (err, user) => {
      user.chosenMoods = req.body.moods;
      user.chosenCategories = req.body.categories;
      user.save();
      res.end();
    });
  });

  app.post('/api/user/:user/cupboard', (req, res) => {
    User.findOne({ _id: req.params.user }, 'cupboard').populate({
      path: 'cupboard',
      select: ['title', 'category', 'score', 'reviews'],
      populate: {
        path: 'category',
        select: 'background'
      }
    }).exec( (err, user) => {
      if (err) { throw err; console.log(err) };
      if( user ){
        res.send(user.cupboard);
      } else {
        console.log('No user??');
      }
    });
  });

  app.post('/api/user/wishlist/add', (req, res) => {
    User.findOne({ _id: req.body.userId }, (err, user) => {
      if (err) { throw err };
      if (user) {
        if (user.wishlist.indexOf(req.body.teaId) > -1) {
          res.send('Already got one');
        } else {
          Tea.findOne({ _id: req.body.teaId }, (err, tea) => {
            if (err) { throw err };
            user.wishlist.push(tea);
            user.save();
          });
        }
      };
    })
  });

  app.get('/api/user/:userId/wishlist/get', (req, res) => {
    User.findOne({ _id: req.params.userId }).populate({
      path: 'wishlist',
      populate: {
        path: 'category',
        select: 'background'
      }
    }).exec( (err, user) => {
      if (err) { throw err };
      if( user ){
        res.send(user.wishlist);
      }
    });
  });


  app.get('/api/user/:user/discover/categories', (req, res) => {
    User.findOne({ _id: req.params.user }, ['chosenCategories', 'chosenMoods'])
        .populate({
          path: 'chosenCategories',
          select: 'title'
        })
        .exec((err, user) => {
          if (err) { throw err };
          if (user) {
            if (user.chosenCategories && user.chosenCategories.length > 0) {
              let toSend = [];
              for (let i = 0; i < user.chosenCategories.length; i++) {
                Category.findOne({ _id: user.chosenCategories[i] })
                        .populate({
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
                        })
                        .exec((err, cat) => {
                          toSend.push(cat);
                          if (i === user.chosenCategories.length - 1) {
                            res.send(toSend);
                            // console.log(toSend);
                          }
                        });
              }
            } else {
              res.end();
            }
          } else {
            console.log('NO USER')
          }
        });
  });

  app.get('/api/user/view/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }, ['name', 'avatar', 'followers', 'following'], (err, user) => {
      console.log(user);
      res.send(user);
    });
  });

  app.post('/api/user/:userToFollow/follow', (req, res) => {
    User.findOne({ _id: req.body.authUser }, (err, user) => {
      if (err) { throw err };
      if (user) {
        const { userToFollow } = req.params;
        if (user.following.indexOf(userToFollow) < 0) {
          user.following.push(userToFollow);
          user.save((err) => {
            if (err) { throw err };
            User.findOne({ _id: req.params.userToFollow }, (err, otherUser) => {
              if (err) { throw err };
              if (otherUser.followers.indexOf(user._id) < 0) {
                otherUser.followers.push(user);
                otherUser.save((err) => {
                  if (err) { throw err };
                  console.log('Success!');
                  res.send('success');
                })
              } else {
                console.log('ALREADY FOLLOWING')
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

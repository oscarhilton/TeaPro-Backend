const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tea = mongoose.model('Tea');
const Category = mongoose.model('Category');

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
      console.log(user);
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
        console.log(user);
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
        console.log(user.wishlist.indexOf(req.body.teaId));
        if (user.wishlist.indexOf(req.body.teaId) > -1) {
          res.send('Already got one');
          console.log('Already got one');
        } else {
          Tea.findOne({ _id: req.body.teaId }, (err, tea) => {
            if (err) { throw err };
            user.wishlist.push(tea);
            user.save();
            console.log("saved", user);
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
    console.log('DISCOVER CATS, WITH CHANGE!');
    User.findOne({ _id: req.params.user }, ['chosenCategories', 'chosenMoods'])
        .populate({
          path: 'chosenCategories',
          select: 'title'
        })
        .exec((err, user) => {
          if (err) { throw err };
          if (user) {
            if (user.chosenCategories && user.chosenCategories.length > 0) {
              console.log('YES, CATS!');
              let toSend = [];
              console.log(user.chosenCategories.length, ' LENGTH');
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
              console.log('NO, NO CATS!');
              res.end();
            }
          } else {
            console.log('NO USER')
          }
        });
  });

  app.get('/api/user/view/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }, ['name', 'avatar'], (err, user) => {
      console.log(user);
      res.send(user);
    });
  });

};

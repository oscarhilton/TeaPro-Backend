const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tea = mongoose.model('Tea');

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

  app.post('/api/user/:user/cupboard', (req, res) => {
    User.findOne({ _id: req.params.user }).populate({
      path: 'cupboard',
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

  app.post('/api/user/wishlist/get', (req, res) => {
    User.findOne({ _id: req.body.userId }).populate({
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
}

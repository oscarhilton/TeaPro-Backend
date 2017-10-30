'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tea = mongoose.model('Tea');

module.exports = function (app) {
  app.post('/api/user/cupboard/add', function (req, res) {
    User.findOne({ _id: req.body.userId }, function (err, user) {
      if (err) {
        throw err;
      };
      if (user) {
        console.log(user.cupboard.indexOf(req.body.teaId));
        if (user.cupboard.indexOf(req.body.teaId) > -1) {
          res.send('Already got one');
          console.log('Already got one');
        } else {
          Tea.findOne({ _id: req.body.teaId }, function (err, tea) {
            if (err) {
              throw err;
            };
            user.cupboard.push(tea);
            user.save();
            console.log("saved", user);
          });
        }
      };
    });
  });

  app.post('/api/user/cupboard/get', function (req, res) {
    User.findOne({ _id: req.body.userId }).populate({
      path: 'cupboard',
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
        console.log(user);
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
        console.log(user.wishlist.indexOf(req.body.teaId));
        if (user.wishlist.indexOf(req.body.teaId) > -1) {
          res.send('Already got one');
          console.log('Already got one');
        } else {
          Tea.findOne({ _id: req.body.teaId }, function (err, tea) {
            if (err) {
              throw err;
            };
            user.wishlist.push(tea);
            user.save();
            console.log("saved", user);
          });
        }
      };
    });
  });

  app.post('/api/user/wishlist/get', function (req, res) {
    User.findOne({ _id: req.body.userId }).populate({
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
};
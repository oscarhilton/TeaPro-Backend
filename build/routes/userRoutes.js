'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tea = mongoose.model('Tea');

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

  app.post('/api/user/:user/cupboard', function (req, res) {
    User.findOne({ _id: req.params.user }).populate({
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
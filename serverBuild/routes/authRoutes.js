'use strict';

var _auth = require('../controllers/auth');

var passport = require('passport');
// var auth = require('../services/passport');


module.exports = function (app) {
  // Set up auth routes
  app.get('/auth/facebook', _auth.facebookLogin);
  app.get('/auth/google', _auth.googleLogin);
  app.get('/auth/facebook/callback', _auth.facebookMiddleware, _auth.oauthCallback);
  app.get('/auth/google/callback', _auth.googleMiddleware, _auth.oauthCallback);

  app.get('/api/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', function (req, res) {
    res.send(req.user);
  });
};
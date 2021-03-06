const passport = require('passport');
// var auth = require('../services/passport');
import {
  facebookLogin,
  facebookMiddleware,
  googleLogin,
  googleMiddleware,
  oauthCallback,
} from '../controllers/auth';

module.exports = app => {
  // Set up auth routes
  app.get('/auth/facebook', facebookLogin);
  app.get('/auth/google', googleLogin);
  app.get('/auth/facebook/callback', facebookMiddleware, oauthCallback);
  app.get('/auth/google/callback', googleMiddleware, oauthCallback);

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

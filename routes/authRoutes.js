const passport = require('passport');
var auth = require('../controllers/auth');

module.exports = app => {
  // Set up auth routes
  app.get('/auth/facebook', auth.facebookLogin);
  app.get('/auth/google', auth.googleLogin);
  app.get('/auth/facebook/callback', auth.facebookMiddleware, auth.oauthCallback);
  app.get('/auth/google/callback', auth.googleMiddleware, auth.oauthCallback);

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

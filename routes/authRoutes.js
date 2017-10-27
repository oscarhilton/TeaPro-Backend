const passport = require('passport');
var _auth = require('../controllers/auth-babel');

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

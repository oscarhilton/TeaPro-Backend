const passport = require('passport');
var auth = require('../services/passport');

module.exports = app => {
  // Set up auth routes
  app.get('/auth/facebook',
          passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
          passport.authenticate('facebook'),
          (req, res) => {
            console.log(req, res);
            res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
          }),

  app.get('/auth/google',
          passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
          passport.authenticate('google'),
          (req, res) => {
            res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
          }),

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

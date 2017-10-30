'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oauthCallback = exports.googleMiddleware = exports.googleLogin = exports.facebookMiddleware = exports.facebookLogin = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
var User = mongoose.model('User');
// Import Facebook and Google OAuth apps configs
var keys = require('../config/keys');

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
var transformFacebookProfile = function transformFacebookProfile(profile) {
  return {
    oauth_id: profile.id,
    name: profile.name,
    avatar: profile.picture.data.url
  };
};

// Transform Google profile into user object
var transformGoogleProfile = function transformGoogleProfile(profile) {
  return {
    oauth_id: profile.id,
    name: profile.displayName,
    avatar: profile.image.url
  };
};

// Register Facebook Passport strategy
_passport2.default.use(new _passportFacebook2.default(keys.facebook,
// Gets called when user authorizes access to their profile
function (accessToken, refreshToken, profile, done) {
  var _temp;

  return Promise.resolve().then(function () {
    return Promise.all([null, createOrGetUserFromDatabase(transformFacebookProfile(profile._json))]);
  }).then(function (_resp) {
    _temp = _resp;
    return (
      // Return done callback and pass transformed user object
      done(_temp[0], _temp[1])
    );
  });
}));

// Register Google Passport strategy
_passport2.default.use(new _passportGoogleOauth2.default(keys.google, function (accessToken, refreshToken, profile, done) {
  var _temp2;

  return Promise.resolve().then(function () {
    return Promise.all([null, createOrGetUserFromDatabase(transformGoogleProfile(profile._json))]);
  }).then(function (_resp) {
    _temp2 = _resp;
    return done(_temp2[0], _temp2[1]);
  });
}));

var createOrGetUserFromDatabase = function createOrGetUserFromDatabase(userProfile) {
  var user;
  return Promise.resolve().then(function () {
    return User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
  }).then(function (_resp) {
    user = _resp;

    if (!user) {
      user = new User({
        oauth_id: userProfile.oauth_id,
        name: userProfile.name,
        avatar: userProfile.avatar
      });
      return user.save();
    }
  }).then(function () {
    return user;
  });
};

// Serialize user into the sessions
_passport2.default.serializeUser(function (user, done) {
  return done(null, user);
});

// Deserialize user from the sessions
_passport2.default.deserializeUser(function (user, done) {
  return done(null, user);
});

// Facebook
var facebookLogin = exports.facebookLogin = _passport2.default.authenticate('facebook');
var facebookMiddleware = exports.facebookMiddleware = _passport2.default.authenticate('facebook', { failureRedirect: '/auth/facebook' });

// Google
var googleLogin = exports.googleLogin = _passport2.default.authenticate('google', { scope: ['profile'] });
var googleMiddleware = exports.googleMiddleware = _passport2.default.authenticate('google', { failureRedirect: '/auth/google' });

// Callback
var oauthCallback = exports.oauthCallback = function oauthCallback(req, res) {
  return Promise.resolve().then(function () {
    res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
  });
};
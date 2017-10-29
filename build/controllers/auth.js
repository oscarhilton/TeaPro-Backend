function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
const mongoose = require('mongoose');
const User = mongoose.model('User');
// Import Facebook and Google OAuth apps configs
const keys = require('../config/keys');
require('babel-polyfill');

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = profile => ({
  oauth_id: profile.id,
  name: profile.name,
  avatar: profile.picture.data.url
});

// Transform Google profile into user object
const transformGoogleProfile = profile => ({
  oauth_id: profile.id,
  name: profile.displayName,
  avatar: profile.image.url
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(keys.facebook,
// Gets called when user authorizes access to their profile
(() => {
  var _ref = _asyncToGenerator(function* (accessToken, refreshToken, profile, done) {
    return (
      // Return done callback and pass transformed user object
      done(null, (yield createOrGetUserFromDatabase(transformFacebookProfile(profile._json))))
    );
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})()));

// Register Google Passport strategy
passport.use(new GoogleStrategy(keys.google, (() => {
  var _ref2 = _asyncToGenerator(function* (accessToken, refreshToken, profile, done) {
    return done(null, (yield createOrGetUserFromDatabase(transformGoogleProfile(profile._json))));
  });

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
})()));

const createOrGetUserFromDatabase = (() => {
  var _ref3 = _asyncToGenerator(function* (userProfile) {
    let user = yield User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
    if (!user) {
      user = new User({
        oauth_id: userProfile.oauth_id,
        name: userProfile.name,
        avatar: userProfile.avatar
      });
      yield user.save();
    }
    return user;
  });

  return function createOrGetUserFromDatabase(_x9) {
    return _ref3.apply(this, arguments);
  };
})();

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Facebook
export const facebookLogin = passport.authenticate('facebook');
export const facebookMiddleware = passport.authenticate('facebook', { failureRedirect: '/auth/facebook' });

// Google
export const googleLogin = passport.authenticate('google', { scope: ['profile'] });
export const googleMiddleware = passport.authenticate('google', { failureRedirect: '/auth/google' });

// Callback
export const oauthCallback = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
  });

  return function oauthCallback(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
})();
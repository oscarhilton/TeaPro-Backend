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

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _mongoose2.default.model('User');
// Import Facebook and Google OAuth apps configs
var keys = require('./config/keys');

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
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, done) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = done;
            _context.next = 3;
            return createOrGetUserFromDatabase(transformFacebookProfile(profile._json));

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt('return', (0, _context.t0)(null, _context.t1));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

// Register Google Passport strategy
_passport2.default.use(new _passportGoogleOauth2.default(keys.google, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accessToken, refreshToken, profile, done) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = done;
            _context2.next = 3;
            return createOrGetUserFromDatabase(transformGoogleProfile(profile._json));

          case 3:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', (0, _context2.t0)(null, _context2.t1));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}()));

var createOrGetUserFromDatabase = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userProfile) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            user = new User({
              oauth_id: userProfile.oauth_id,
              name: userProfile.name,
              avatar: userProfile.avatar
            });
            _context3.next = 7;
            return user.save();

          case 7:
            return _context3.abrupt('return', user);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function createOrGetUserFromDatabase(_x9) {
    return _ref3.apply(this, arguments);
  };
}();

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
var oauthCallback = exports.oauthCallback = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function oauthCallback(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

const User = mongoose.model('User');
// Import Facebook and Google OAuth apps configs
const keys = require('../config/keys');

const transformFacebookProfile = (profile) => ({
  oauth_id: profile.id,
  name: profile.name,
  avatar: profile.picture.data.url,
});

// Transform Google profile into user object
const transformGoogleProfile = (profile) => ({
  oauth_id: profile.id,
  name: profile.displayName,
  avatar: profile.image.url,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(keys.facebook,
  // Gets called when user authorizes access to their profile
  async (accessToken, refreshToken, profile, done)
    // Return done callback and pass transformed user object
    => done(null, await createOrGetUserFromDatabase(transformFacebookProfile(profile._json)))
));

// Register Google Passport strategy
passport.use(new GoogleStrategy(keys.google,
  async (accessToken, refreshToken, profile, done)
    => done(null, await createOrGetUserFromDatabase(transformGoogleProfile(profile._json)))
));

const createOrGetUserFromDatabase = async (userProfile) => {
  let user = await User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
  if (!user) {
    user = new User({
      oauth_id: userProfile.oauth_id,
      name: userProfile.name,
      avatar: userProfile.avatar,
    });
    await user.save();
  }
  return user;
};

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

module.exports = {
  facebookLogin: function() {
    passport.authenticate('facebook');
  },
  facebookMiddleware: function() {
    passport.authenticate('facebook', { failureRedirect: '/auth/facebook' });
  },
  googleLogin: function() {
    googleLogin = passport.authenticate('google', { scope: ['profile'] });
  },
  googleMiddleware: function() {
    googleMiddleware = passport.authenticate('google', { failureRedirect: '/auth/google' });
  },
  oauthCallback: async function(req, res) {
    res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
  }
}

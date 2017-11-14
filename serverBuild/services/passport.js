// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const mongoose = require('mongoose');
// const keys = require('../config/keys');
//
// const User = mongoose.model('User');
//
// passport.serializeUser((user, done) => {
//  done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//  User.findById(id).then(user => {
//    done(null, user);
//  });
// });
//
// passport.use(
//  new GoogleStrategy(
//    {
//      clientID: keys.google.clientID,
//      clientSecret: keys.google.clientSecret,
//      callbackURL: '/auth/google/callback',
//      proxy: true
//    },
//    async (accessToken, refreshToken, profile, done) => {
//      const existingUser = await User.findOne({ oauth_id: profile.id });
//      if (existingUser) {
//        return done(null, existingUser);
//      }
//      const user = await new User({
//        oauth_id: profile.id,
//        name: profile.displayName,
//        avatar: profile.image.url
//      }).save();
//      done(null, user);
//    }
//  )
// );
//
// passport.use(
//  new FacebookStrategy(
//    {
//      clientID: keys.facebook.clientID,
//      clientSecret: keys.facebook.clientSecret,
//      callbackURL: '/auth/facebook/callback',
//      proxy: true
//    },
//    async (accessToken, refreshToken, profile, done) => {
//      const existingUser = await User.findOne({ oauth_id: profile.id });
//      if (existingUser) {
//        return done(null, existingUser);
//      }
//      const user = await new User({
//        oauth_id: userProfile.oauth_id,
//        name: userProfile.name,
//        avatar: userProfile.avatar
//      }).save();
//      done(null, user);
//    }
//  )
// );
"use strict";
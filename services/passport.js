// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const mongoose = require('mongoose');
// const keys = require('../config/keys');
//
// const User = mongoose.model('User');
//
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });
//
// // Transform Facebook profile because Facebook and Google profile objects look different
// // and we want to transform them into user objects that have the same set of attributes
// const transformFacebookProfile = (profile) => ({
//   oauth_id: profile.id,
//   name: profile.name,
//   avatar: profile.picture.data.url,
// });
//
// // Transform Google profile into user object
// const transformGoogleProfile = (profile) => ({
//   oauth_id: profile.id,
//   name: profile.displayName,
//   avatar: profile.image.url,
// });
//
// // Register Facebook Passport strategy
// passport.use(new FacebookStrategy(facebook,
//   // Gets called when user authorizes access to their profile
//   async (accessToken, refreshToken, profile, done)
//     // Return done callback and pass transformed user object
//     => done(null, await createOrGetUserFromDatabase(transformFacebookProfile(profile._json)))
// ));
//
// const createOrGetUserFromDatabase = async (userProfile) => {
//   let user = await User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
//   if (!user) {
//     user = new User({
//       oauth_id: userProfile.oauth_id,
//       name: userProfile.name,
//       avatar: userProfile.avatar,
//     });
//     await user.save();
//   }
//   return user;
// };
//
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/auth/google/callback',
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       const existingUser = await User.findOne({ googleId: profile.id });
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//
//       const user = await new User({
//         googleId: profile.id,
//         firstName: profile.name.givenName,
//         firstName: profile.name.givenName,
//         lastName: profile.name.familyName,
//         gender: profile.gender
//       }).save();
//       done(null, user);
//     }
//   )
// );
//
// const createOrGetUserFromDatabase = async (userProfile) => {
//   console.log(userProfile);
//   let user = await User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
//   if (!user) {
//     user = new User({
//       oauth_id: userProfile.oauth_id,
//       name: userProfile.name,
//       avatar: userProfile.avatar,
//     });
//     await user.save();
//   }
//   return user;
// };

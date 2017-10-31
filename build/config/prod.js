'use strict';

// DEV keys
// module.exports = {
//   mongoURI: process.env.MONGO_URI,
//   cookieKey: process.env.COOKIE_KEY,
//   facebook: {
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
//     proxy: true
//   },
//   google: {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     proxy: true
//   }
// }

// DEV keys
module.exports = {
  mongoURI: 'mongodb://oscar:teapro@ds127153.mlab.com:27153/tea-pro-dev',
  cookieKey: 'fjskdahfljkffHJKFAHAJSKLDHASJKLDHjkashdjkashdjasjdhas',
  facebook: {
    clientID: '326772181065683',
    clientSecret: 'c73ef5ede4e160789be15776014a741b',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
    proxy: true
  },
  google: {
    clientID: '1074209856450-8uh3dtg5bh1q484qs5337tuqfrp2ruqe.apps.googleusercontent.com',
    clientSecret: 'G9xoIrnF04V14LGmg0gZpOEq',
    callbackURL: '/auth/google/callback',
    proxy: true
  }
};
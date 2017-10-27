// DEV keys
export const mongoURI = process.env.MONGO_URI;
export const cookieKey = process.env.COOKIE_KEY;

export const facebook = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};

export const google = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

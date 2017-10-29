const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require("babel-core/register");
require("babel-polyfill");

const keys = require('./config/keys');
require('./models/User');
require('./models/Tea');
require('./models/Category');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// const populate = require('./populate');

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/teaRoutes')(app);
require('./routes/userRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
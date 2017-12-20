const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const socket = require('socket.io');

// Config
const keys = require('./config/keys');

// Mongoose models
require('./models/User');
require('./models/Tea');
require('./models/Category');
require('./models/Reviews');
require('./models/UserPosts');
require('./models/Moods');
require('./models/Uploads');
require('./models/Comment');
require('./models/Notifications');

// Passport
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();


// const populate = require('./populate');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/moodsRoutes')(app);
require('./routes/reviewRoutes')(app);
require('./routes/searchRoutes')(app);
require('./routes/teaRoutes')(app);
require('./routes/uploadRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/userPostRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('NEW CONNECTON:  ');
  console.log(socket.id);

  socket.on('subscribe', function(room) {
      console.log('joining room', room);
      socket.join(room);
  });

  socket.on('new follower', function(user) {
    console.log('new user follower', user, ' - FROM SOCKET!');
    console.log(user.room);
    console.log(user.message);
    socket.broadcast.to(user.room).emit('incoming new follower', {
        message: user.message
    });
  });

  socket.on('send message', function(data) {
      console.log(data);
      console.log('hello');
      console.log('sending room post', data.room);
      socket.broadcast.to(data.room).emit('conversation private post', {
          message: data.message
      });
  });
}

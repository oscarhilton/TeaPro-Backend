const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tea = mongoose.model('Tea');

module.exports = app => {
  app.post('/api/user/cupboard/add', (req, res) => {
    User.findOne({ _id: req.body.userId }, (err, user) => {
      if (err) { throw err };
      if (user) {
        console.log(user.cupboard.indexOf(req.body.teaId));
        if (user.cupboard.indexOf(req.body.teaId) > -1) {
          res.send('Already got one');
          console.log('Already got one');
        } else {
          Tea.findOne({ _id: req.body.teaId }, (err, tea) => {
            if (err) { throw err };
            user.cupboard.push(tea);
            user.save();
            console.log("saved", user);
          });
        }
      };
    })
  });

  app.post('/api/user/cupboard/get', (req, res) => {
    User.findOne({ _id: req.body.userId }).populate({
      path: 'cupboard',
      populate: {
        path: 'category',
        select: 'background'
      }
    }).exec( (err, user) => {
      if (err) { throw err };
      if( user ){
        res.send(user.cupboard);
      }
    });
  });
}

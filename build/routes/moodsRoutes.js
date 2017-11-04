'use strict';

var mongoose = require('mongoose');
var Moods = mongoose.model('Moods');
var Tea = mongoose.model('Tea');
var multer = require('multer');

var path = 'uploads/';

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + '/../uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('thumbnail');

module.exports = function (app) {
  app.post('/api/teas/moods/create', function (req, res, next) {
    var _req$body = req.body,
        title = _req$body.title,
        description = _req$body.description;

    upload(req, res, function (err) {
      console.log(err, 'Im in post , inside upload' + path);
      if (err) {
        return res.end('Error uploading file.');
      }
      res.end('File is uploaded ::: ' + path);
      // console.log('File is uploaded ::: ' + path);
      // console.log(req.file);
      // console.log(req.file.path);
    });
    // console.log(req.body.mood);
    // res.send('hello');
    // Moods.findOne({ title }, (err, mood) => {
    //   if (mood) {
    //     res.send('Already got one of those!');
    //     return;
    //   }
    //   const newMood = new Moods({
    //     title,
    //     description,
    //     imageURI
    //   });
    //   newMood.save();
    //   res.send(newMood);
    // });
  });

  app.post('/api/teas/:teaId/mood/add', function (req, res) {
    var _req$body$mood = req.body.mood,
        moodId = _req$body$mood.moodId,
        score = _req$body$mood.score;

    Tea.findOne({ _id: teaId }, function (err, tea) {
      var mood = {
        mood: moodId,
        score: score
      };
      tea.moods.push(mood);
      tea.save();
      Moods.findOne({ _id: moodId }, function (err, mood) {
        mood.teas.push(tea);
        mood.save();
      });
    });
  });
};
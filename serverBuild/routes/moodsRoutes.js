'use strict';

var mongoose = require('mongoose');
var Moods = mongoose.model('Moods');
var Tea = mongoose.model('Tea');

// Moods.findOne({ title: 'Get sleepy' }, (err, mood) => {
//   console.log(mood);
//   Tea.find({}, (err, teas) => {
//     teas.forEach((tea) => {
//       tea.moods.push({
//         mood,
//         score: 30
//       })
//       tea.save();
//     })
//   })
// })

module.exports = function (app) {
  app.get('/api/moods/all', function (req, res) {
    Moods.find().populate('image').exec(function (err, moods) {
      if (err) {
        throw err;
      };
      res.send(moods);
    });
  });

  app.post('/api/teas/moods/create', function (req, res, next) {
    var _req$body = req.body,
        title = _req$body.title,
        description = _req$body.description,
        image = _req$body.image;


    Moods.findOne({ title: title }, function (err, mood) {
      if (mood) {
        res.send('Already got one of those!');
        return;
      }
      var newMood = new Moods({
        title: title,
        description: description,
        image: image
      });
      newMood.save(function (err) {
        if (!err) {
          newMood.populate('image', function (err, mood) {
            res.send(newMood);
          });
        }
      });
    });
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
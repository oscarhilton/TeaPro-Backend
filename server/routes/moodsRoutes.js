const mongoose = require('mongoose');
const Moods = mongoose.model('Moods');
const Tea = mongoose.model('Tea');


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

module.exports = app => {
  app.get('/api/moods/all', (req, res) => {
    Moods.find().populate('image').exec((err, moods) => {
      if (err) { throw err; };
      res.send(moods);
    })
  });

  app.post('/api/teas/moods/create', (req, res, next) => {
    const { title, description, image } = req.body;

    Moods.findOne({ title }, (err, mood) => {
      if (mood) {
        res.send('Already got one of those!');
        return;
      }
      const newMood = new Moods({
        title,
        description,
        image
      });
      newMood.save((err) => {
        if(!err) {
          newMood.populate('image', (err, mood) => {
            res.send(newMood);
          });
        }
      });
    });

	});

  app.post('/api/teas/:teaId/mood/add', (req, res) => {
    const { moodId, score } = req.body.mood;
    Tea.findOne({ _id: teaId }, (err, tea) => {
      const mood = {
        mood: moodId,
        score
      };
      tea.moods.push(mood);
      tea.save();
      Moods.findOne({ _id: moodId }, (err, mood) => {
        mood.teas.push(tea);
        mood.save();
      });
    });
  });
};

const mongoose = require('mongoose');
const Moods = mongoose.model('Moods');
const Tea = mongoose.model('Tea');

module.exports = app => {
  app.post('/api/teas/moods/add', (req, res) => {
    const { title, description, imageURI } = req.body.mood;
    Moods.findOne({ title }, (err, mood) => {
      if (mood) {
        res.send('Already got one of those!');
        return;
      }
      const newMood = new Moods({
        title,
        description,
        imageURI
      });
      newMood.save();
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

const mongoose = require('mongoose');
const Moods = mongoose.model('Moods');
const Tea = mongoose.model('Tea');
const multer = require('multer');

var path = 'uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage : storage }).single('thumbnail');

module.exports = app => {
  app.post('/api/teas/moods/create', (req, res, next) => {
    const { title, description } = req.body;
    upload(req,res,function(err) {
  		console.log(err, 'Im in post , inside upload'+path);
  		if(err) {
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

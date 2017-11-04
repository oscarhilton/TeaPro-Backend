const mongoose = require('mongoose');
const Uploads = mongoose.model('Uploads');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage : storage }).single('file');

module.exports = app => {
  app.post('/api/upload', (req, res, next) => {
    // const { title, description } = req.body;
    upload(req,res,function(err) {
  		if(err) {
  			return res.end('Error uploading file.');

  		}
      const { originalname, mimetype, path, size } = req.file;
      const newFile = new Uploads({
        title: originalname,
        path,
        type: mimetype,
        size
      })
      newFile.save();
      res.send(newFile);
      console.log(newFile);
  	});
  });

  app.get('/api/media/all', (req, res) => {
    Uploads.find({}, (err, media) => {
      console.log(media);
      res.send(media);
      console.log(res);
    });
  });

};

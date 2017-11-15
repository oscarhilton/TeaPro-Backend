const mongoose = require('mongoose');
const Uploads = mongoose.model('Uploads');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../client/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../client/public/uploads/user/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage : storage }).single('file');
var userUpload = multer({ storage : userStorage }).single('file');

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
  	});
  });

  app.post('/api/userupload', (req, res, next) => {
    // const { title, description } = req.body;
    console.log(req.file);
    // userUpload(req,res,function(err) {
  	// 	if(err) {
  	// 		return res.end('Error uploading file.');
    //
  	// 	}
      // const { originalname, mimetype, path, size } = req.file;
      // const newFile = new Uploads({
      //   title: originalname,
      //   path,
      //   type: mimetype,
      //   size
      // })
      // newFile.save();
      // res.send(newFile);
  	// });
  });

  app.get('/api/media/all', (req, res) => {
    Uploads.find({}, (err, media) => {
      res.send(media);
    });
  });

};

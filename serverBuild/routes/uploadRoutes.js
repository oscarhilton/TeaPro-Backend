'use strict';

var mongoose = require('mongoose');
var Uploads = mongoose.model('Uploads');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + '/../../client/public/uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('file');

module.exports = function (app) {
  app.post('/api/upload', function (req, res, next) {
    // const { title, description } = req.body;
    upload(req, res, function (err) {
      if (err) {
        return res.end('Error uploading file.');
      }
      var _req$file = req.file,
          originalname = _req$file.originalname,
          mimetype = _req$file.mimetype,
          path = _req$file.path,
          size = _req$file.size;

      var newFile = new Uploads({
        title: originalname,
        path: path,
        type: mimetype,
        size: size
      });
      newFile.save();
      res.send(newFile);
    });
  });

  app.get('/api/media/all', function (req, res) {
    Uploads.find({}, function (err, media) {
      res.send(media);
    });
  });
};
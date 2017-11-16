'use strict';

var mongoose = require('mongoose');
var Uploads = mongoose.model('Uploads');
var multer = require('multer');
var fs = require('fs');
var Tea = mongoose.model('Tea');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + '/../../client/public/uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var userStorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + '/../../client/public/uploads/user/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var uploadUserImage = function uploadUserImage(req, res, callback) {};

var upload = multer({ storage: storage }).single('file');
var userUpload = multer({ storage: userStorage }).single('file');

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

  app.post('/api/userupload/tea', function (req, res, next) {
    userUpload(req, res, function (err) {
      if (err) {
        return res.end('Error uploading file.');
      }
      console.log(req.body);
      var _req$file2 = req.file,
          path = _req$file2.path,
          filename = _req$file2.filename,
          size = _req$file2.size;
      var _req$body = req.body,
          timestamp = _req$body.timestamp,
          latitude = _req$body.latitude,
          longitude = _req$body.longitude;

      var newUserFile = new Uploads({
        title: filename,
        path: path,
        type: 'image',
        size: size,
        latitude: latitude,
        longitude: longitude,
        uploadDate: timestamp,
        approved: false
      });
      console.log(newUserFile);
      newUserFile.save();
      Tea.findOne({ _id: req.body.teaId }, function (err, tea) {
        tea.userImages.push(newUserFile);
        tea.save();
        console.log(tea);
      });
    });
  });

  app.post('/api/media/:fileId', function (req, res) {
    Uploads.findOne({ _id: req.params.fileId }, function (err, file) {
      if (err) {
        throw err;
      };
      fs.unlink(file.path, function (err) {
        if (err) {
          var stringErr = String(err);
          if (stringErr.includes("no such file or directory")) {
            file.remove();
            return res.send({
              deleted: true,
              message: 'No file found, deleted record',
              file: file
            });
          }
          return res.send({
            deleted: false,
            message: 'File failed to delete'
          });
        } else {
          file.remove();
          res.send({
            deleted: true,
            message: 'File deleted successfully',
            file: file
          });
        }
      });
    });
  });

  app.get('/api/media/all', function (req, res) {
    Uploads.find({}, function (err, media) {
      res.send(media);
    });
  });
};
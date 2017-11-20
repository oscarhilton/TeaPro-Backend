'use strict';

var mongoose = require('mongoose');
var Uploads = mongoose.model('Uploads');
var multer = require('multer');
var ImgurStorage = require('multer-storage-imgur');
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

var upload = multer({ storage: storage }).single('file');
var userUpload = multer({ storage: userStorage }).single('file');
var imgurUpload = multer({ storage: ImgurStorage({ clientId: 'e13776815032d0c' }) }).single('file');

module.exports = function (app) {
  app.post('/api/upload', function (req, res, next) {
    // const { title, description } = req.body;
    imgurUpload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.end('Error uploading file.');
      }
      // console.log(req.file, '<<>>', req.body);
      var _req$file = req.file,
          originalname = _req$file.originalname,
          mimetype = _req$file.mimetype;
      var _req$file$data = req.file.data,
          link = _req$file$data.link,
          datetime = _req$file$data.datetime,
          size = _req$file$data.size;

      var newFile = new Uploads({
        title: originalname,
        path: link,
        type: mimetype,
        size: size,
        approved: true,
        uploadDate: datetime
      });
      newFile.save();
      res.send(newFile);
    });
  });

  app.post('/api/userupload/tea', function (req, res, next) {
    console.log('made it here');
    imgurUpload(req, res, function (err) {
      if (err) {
        console.log(err, ' error uploading');
        return res.end('Error uploading file.');
      }
      var _req$file2 = req.file,
          originalname = _req$file2.originalname,
          mimetype = _req$file2.mimetype;
      var _req$file$data2 = req.file.data,
          link = _req$file$data2.link,
          size = _req$file$data2.size;
      var _req$body = req.body,
          timestamp = _req$body.timestamp,
          latitude = _req$body.latitude,
          longitude = _req$body.longitude;

      var newUserFile = new Uploads({
        title: originalname,
        path: link,
        type: mimetype,
        size: size,
        latitude: latitude,
        longitude: longitude,
        uploadDate: timestamp,
        approved: false
      });
      res.send(newUserFile);
      newUserFile.save();
      Tea.findOne({ _id: req.body.teaId }, function (err, tea) {
        tea.userImages.push(newUserFile);
        tea.save();
      });
    });
  });

  app.post('/api/media/:fileId/delete', function (req, res) {
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
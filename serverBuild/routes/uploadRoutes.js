'use strict';

var mongoose = require('mongoose');
var Uploads = mongoose.model('Uploads');
var multer = require('multer');
var ImgurStorage = require('multer-storage-imgur');
var fs = require('fs');
var Tea = mongoose.model('Tea');
var User = mongoose.model('User');

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

  app.post('/api/upload/userupload', function (req, res, next) {
    imgurUpload(req, res, function (err) {
      if (err) {
        console.log(err, ' error uploading');
        return res.end('Error uploading file.');
      }
      // console.log(req.file, '<<< file');
      // console.log(req.body, '<<< body');
      var _req$file2 = req.file,
          originalname = _req$file2.originalname,
          mimetype = _req$file2.mimetype;
      var _req$file$data2 = req.file.data,
          link = _req$file$data2.link,
          size = _req$file$data2.size,
          datetime = _req$file$data2.datetime;

      var newUserFile = new Uploads({
        title: originalname,
        path: link,
        type: mimetype,
        size: size,
        uploadDate: datetime,
        approved: false,
        author: req.body.userId
      });
      newUserFile.save(function (err) {
        if (err) {
          throw err;
        }
        res.send(newUserFile);
      });
    });
  });

  app.post('/api/userupload/:userId/tea', function (req, res, next) {
    imgurUpload(req, res, function (err) {
      if (err) {
        console.log(err, ' error uploading');
        return res.end('Error uploading file.');
      }
      var _req$file3 = req.file,
          originalname = _req$file3.originalname,
          mimetype = _req$file3.mimetype;
      var _req$file$data3 = req.file.data,
          link = _req$file$data3.link,
          size = _req$file$data3.size;
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
        approved: false,
        author: req.params.userId
      });
      newUserFile.save(function (err, file) {
        Tea.findOne({ _id: req.body.teaId }, function (err, tea) {
          if (!tea) {
            return res.send('No tea found - possible API conflict');
          }
          tea.userImages.push(file);
          tea.save(function (err) {
            console.log(tea, 'SAVED TEA');
            console.log(file);
            User.findOne({ _id: req.params.userId }, function (err, user) {
              if (!user) {
                console.log('NO USER!!!!! HELPPP!');
                return res.send('No user found - possible API conflict');
              }
              user.images.push(file);
              user.save();
              res.send(file);
            });
          });
        });
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
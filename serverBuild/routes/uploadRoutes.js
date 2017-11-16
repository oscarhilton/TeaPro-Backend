'use strict';

var mongoose = require('mongoose');
var Uploads = mongoose.model('Uploads');
var multer = require('multer');
var fs = require('fs');

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

  app.post('/api/userupload', function (req, res, next) {
    // const { title, description } = req.body;
    console.log(req.file);
    console.log(req.body);
    res.send(req.file);
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
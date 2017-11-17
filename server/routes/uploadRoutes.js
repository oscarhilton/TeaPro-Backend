const mongoose = require('mongoose');
const Uploads = mongoose.model('Uploads');
const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const fs = require('fs');
const Tea = mongoose.model('Tea');

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
var imgurUpload = multer({ storage: ImgurStorage({ clientId: 'e13776815032d0c' }) }).single('file');

module.exports = app => {
  app.post('/api/upload', (req, res, next) => {
    // const { title, description } = req.body;
    imgurUpload(req,res,function(err) {
  		if(err) {
        console.log(err);
  			return res.end('Error uploading file.');
  		}
      console.log(req.file, '<<>>', req.body);
      const { originalname, mimetype } = req.file;
      const { link, datetime, size } = req.file.data;
      const newFile = new Uploads({
        title: originalname,
        path: link,
        type: mimetype,
        size,
        author: 'Admin',
        approved: true,
        uploadDate: datetime
      })
      newFile.save();
      res.send(newFile);
  	});
  });

  app.post('/api/userupload/tea', (req, res, next) => {
    console.log('made it here');
    imgurUpload(req,res,function(err) {
      if(err) {
        console.log(err, ' error uploading');
        return res.end('Error uploading file.');
      }
      const { originalname, mimetype } = req.file;
      const { link, size } = req.file.data;
      const { timestamp, latitude, longitude } = req.body;
      const newUserFile = new Uploads({
        title: originalname,
        path: link,
        type: mimetype,
        size,
        latitude,
        longitude,
        uploadDate: timestamp,
        approved: false
      })
      console.log(newUserFile);
      newUserFile.save();
      Tea.findOne({ _id: req.body.teaId }, (err, tea) => {
        tea.userImages.push(newUserFile);
        tea.save();
        console.log(tea);
      });
    });
  });

  app.post('/api/media/:fileId/delete', (req, res) => {
    Uploads.findOne({ _id: req.params.fileId }, (err, file) => {
      if (err) { throw err };
      fs.unlink(file.path, (err) => {
        if (err) {
            const stringErr = String(err);
            if (stringErr.includes("no such file or directory")){
              file.remove();
              return res.send({
                deleted: true,
                message: 'No file found, deleted record',
                file
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
              file
            });
        }
      });
    });
  });

  app.get('/api/media/all', (req, res) => {
    Uploads.find({}, (err, media) => {
      res.send(media);
    });
  });

};

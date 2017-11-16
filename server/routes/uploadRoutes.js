const mongoose = require('mongoose');
const Uploads = mongoose.model('Uploads');
const multer = require('multer');
const fs = require('fs');

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

  app.post('/api/media/:fileId', (req, res) => {
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

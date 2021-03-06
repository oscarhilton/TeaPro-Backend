'use strict';

var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Tea = mongoose.model('Tea');

module.exports = function (app) {
  app.get('/api/search/:term', function (req, res) {
    Tea.find({ $text: { $search: req.params.term } }).populate('category').exec(function (err, found) {
      if (err) {
        throw err;
      };
      res.send(found);
    });
  });
};
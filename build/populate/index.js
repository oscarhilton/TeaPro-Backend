'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Category = mongoose.model('Category');
var Tea = mongoose.model('Tea');

var teaData = require('./teaData.json');

teaData.map(function (singleTea) {
  Tea.findOne({ title: singleTea.title }, function (err, foundTea) {
    if (foundTea) {
      // console.log('TEA FOUND!!!', foundTea)
      foundTea.set({
        title: singleTea.title,
        origin: singleTea.origin,
        description: singleTea.description,
        steeptime: singleTea.steeptime
      });
      // console.log(foundTea.title, ' UPDATED')
    } else {
      // console.log('TEA NOT FOUND');
      Category.findOne({ title: singleTea.category }, function (err, foundCat) {
        if (foundCat) {
          var newTea = new Tea({
            title: singleTea.title,
            origin: singleTea.origin,
            description: singleTea.description,
            steeptime: singleTea.steeptime,
            category: foundCat
          });
          newTea.save(function (err, tea) {
            if (err) {
              throw err;
            };
            foundCat.teas.push(newTea);
            foundCat.save();
          });
        } else {
          console.log('Make this category first!', singleTea.category);
        }
      });
    }
  });
});
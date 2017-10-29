const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Category = mongoose.model('Category');
const Tea = mongoose.model('Tea');

const teaData = require('./teaData.json');

teaData.map(singleTea => {
  Tea.findOne({ title: singleTea.title }, (err, foundTea) => {
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
      Category.findOne({ title: singleTea.category }, (err, foundCat) => {
        if (foundCat) {
          const newTea = new Tea({
            title: singleTea.title,
            origin: singleTea.origin,
            description: singleTea.description,
            steeptime: singleTea.steeptime,
            category: foundCat
          });
          newTea.save((err, tea) => {
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
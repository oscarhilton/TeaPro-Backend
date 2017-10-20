const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Category = mongoose.model('Category');
const Tea = mongoose.model('Tea');

const teaData = require('./teaData.json');

teaData.map( singleTea => {
  Tea.findOne({ title: singleTea.title }, (err, foundTea) => {
    if (foundTea) {
      // console.log('TEA FOUND!!!', foundTea)
      foundTea.set({
        title: singleTea.title,
        origin: singleTea.origin,
        description: singleTea.description,
        steeptime: singleTea.steeptime
      })
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
            if (err) { throw err };
            foundCat.teas.push(newTea);
            foundCat.save();
          });
        } else {
          console.log('Make this category first!', singleTea.category);
          // const newCat = new Category({
          //   title: singleTea.category,
          //   background: '#212121'
          // })
          // newCat.save((err, savedCat) => {
          //   const newTea = new Tea({
          //     title: singleTea.title,
          //     origin: singleTea.origin,
          //     description: singleTea.description,
          //     steeptime: singleTea.steeptime,
          //     category: savedCat
          //   });
          //   newTea.save((err, tea) => {
          //     if (err) { throw err };
          //     savedCat.teas.push(newTea);
          //     savedCat.save();
          //   });
          // })
        }
      });
    }
  })
  // Category.findOne({ title: singleTea.category }, (err, foundCat) => {
  //   if (foundCat) {
  //     Tea.find({
  //       title: singleTea.title,
  //       category: {
  //         ObjectId(foundCat._id)
  //       }
  //     }, (err, tea) => {
  //       if (err) { throw err };
  //       if (tea && tea.length > 0) {
  //         console.log('TEA FOUND');
  //         tea.set({
  //           title: singleTea.title,
  //           origin: singleTea.origin,
  //           description: singleTea.description,
  //           steeptime: singleTea.steeptime
  //         })
  //         tea.save();
  //       } else {
  //         console.log('NO TEA FOUND');
  //         const newTea = new Tea({
  //           title: singleTea.title,
  //           origin: singleTea.origin,
  //           description: singleTea.description,
  //           steeptime: singleTea.steeptime,
  //           category: foundCat
  //         });
  //         newTea.save((err, tea) => {
  //           if (err) { throw err };
  //           foundCat.teas.push(newTea);
  //           foundCat.save();
  //         });
  //       }
  //     });
  //   } else {
  //     // console.log('no cat!');
  //   }
  // });
});

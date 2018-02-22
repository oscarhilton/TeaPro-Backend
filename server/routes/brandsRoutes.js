const mongoose = require('mongoose');
const Brand = mongoose.model('Brand');
const Tea = mongoose.model('Tea');

module.exports = app => {
  app.post('/api/teas/brands/new', (req, res) => {
    Brand.findOne({ title: req.body.brand.title }, (err, brand) => {
      if (brand) {
        res.send({ message: 'Already have a brand of that name!' });
      } else {
        Tea.findOne({ _id: req.body.teaId }, (err, tea) => {
          if (err) { throw err };
          tea.save((err) => {
            if (err) { throw err };
            const newBrand = new Brand({
              title: req.body.brand.title,
              description: req.body.brand.description,
              tea: tea._id
            });
            newBrand.save((err, brand) => {
              if (err) { throw err };
              tea.brands.push(newTea);
              tea.save((err, tea) => {
                res.send(brand);
              });
            });
          })
        });
      }
    })
  });
};

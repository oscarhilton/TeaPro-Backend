const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Tea = mongoose.model('Tea');

module.exports = app => {
  app.get('/api/teas/all', (req, res) => {
    Tea.find({}).populate('category').exec((err, teas) => {
      if (err) { throw err };
      res.send({ teas });
    });
  });

  app.get('/api/category/all', (req, res) => {
    Category.find({}).populate('teas').exec((err, cats) => {
      if (err) { throw err };
      res.send({ cats });
    });
  });

  app.post('/api/teas/new', (req, res) => {
    Tea.find({ title: req.body.title }, (err, tea) => {
      if (tea && tea.length > 0) {
        return;
      } else {
        Category.findById( req.body.catId, (err, cat) => {
          if (err) { throw err };
          cat.save((err) => {
            if (err) { throw err };
            const newTea = new Tea({
              title: req.body.title,
              category: cat._id
            });
            newTea.save((err, tea) => {
              if (err) { throw err };
              console.log('Saved!', tea);
            }).then((tea) => {
              console.log('promise', tea);
              tea.populate('category').exec((err, tea) => {
                console.log('populate', tea)
              })
            });
          })
        });
      }
    })
  });

  app.post('/api/category/new', (req, res) => {
    Category.findOne({ title: req.body.title }, (err, cat) => {
      if (cat) {
        res.send({ message: 'You already have a category of that title.', category: null });
      } else {
        const newCategory = new Category({
          title: req.body.title
        })
        newCategory.save((err, cat) => {
          if (err) { throw err };
          console.log('Saved!', cat);
          res.send({ message: 'New category created!', category: cat })
        });
      };
    });
  });

  app.post('/api/category/delete/:catId', (req, res) => {
    Category.findById({ _id: req.params.catId }, (err, cat) => {
      console.log(cat);
      res.send({ cat });
      cat.remove();
    });
  });

  app.get('/api/teas/:teaId/category', (req, res) => {
    Tea.findOne({ _id: req.params.teaId }).populate('category').exec( (err, tea) => {
      if (err) { throw err };
      console.log('TEA CATEGORY: ', tea, 'END');
      res.send({ category: tea.category.title });
    });
  });

  app.get('/api/category/:catId/teas', (req, res) => {
    Category.findOne({ _id: req.params.catId }).populate('tea').exec( (err, cat) => {
      if (err) { throw err };
      console.log(cat);
      res.send({ teas: cat.teas })
    });
  });

};

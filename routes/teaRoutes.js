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
    Category.find({}).populate({
       path: 'teas',
       populate: {
         path: 'category',
         select: 'background'
       }
     }).exec((err, cats) => {
      if (err) { throw err };
      res.send({ cats });
    });
  });

  app.get('/api/category/:title', (req, res) => {
    Category.findOne({ title: req.params.title }).populate('teas').exec( (err, cat) => {
      console.log(cat);
      res.send({ cat });
    });
  })

  app.post('/api/category/edit/:id', (req, res) => {
    Category.findById({ _id: req.params.id }, (err, cat) => {
      const { background } = req.body.editObj;
      cat.set({
        background
      })
      cat.save((err, updatedCat) => {
        if (err) { throw err };
        res.send(updatedCat);
        console.log('updated!', updatedCat);
      })
    });
  });

  app.post('/api/teas/new', (req, res) => {
    Tea.find({ title: req.body.tea.title }, (err, tea) => {
      if (tea && tea.length > 0) {
        res.send({ message: 'Already have a tea of that name!' });
      } else {
        Category.findById( req.body.catId, (err, cat) => {
          if (err) { throw err };
          console.log(cat);
          cat.save((err) => {
            if (err) { throw err };
            const newTea = new Tea({
              title: req.body.tea.title,
              description: req.body.tea.description,
              origin: req.body.tea.origin,
              caffeine: req.body.tea.caffeine,
              steeptime: req.body.tea.steeptime,
              category: cat._id
            });
            newTea.save((err, tea) => {
              if (err) { throw err };
              console.log('Saved!', tea);
              res.send({ message: 'New tea added', newTea: tea });
            });
            cat.teas.push(newTea);
            cat.save();
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
          title: req.body.title,
          background: '#212121'
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
    Tea.findOne({ _id: req.params.teaId }).populate('category', 'background').exec( (err, tea) => {
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

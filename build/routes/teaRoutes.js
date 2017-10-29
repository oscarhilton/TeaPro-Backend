'use strict';

var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Tea = mongoose.model('Tea');

module.exports = function (app) {
  app.get('/api/teas/all', function (req, res) {
    Tea.find({}).populate('category').exec(function (err, teas) {
      if (err) {
        throw err;
      };
      res.send({ teas: teas });
    });
  });

  app.get('/api/category/all', function (req, res) {
    Category.find({}).populate({
      path: 'teas',
      populate: {
        path: 'category',
        select: 'background'
      }
    }).exec(function (err, cats) {
      if (err) {
        throw err;
      };
      res.send({ cats: cats });
    });
  });

  app.get('/api/category/:title', function (req, res) {
    Category.findOne({ title: req.params.title }).populate('teas').exec(function (err, cat) {
      res.send({ cat: cat });
    });
  });

  app.post('/api/category/edit/:id', function (req, res) {
    Category.findById({ _id: req.params.id }, function (err, cat) {
      var background = req.body.editObj.background;

      cat.set({
        background: background
      });
      cat.save(function (err, updatedCat) {
        if (err) {
          throw err;
        };
        res.send(updatedCat);
      });
    });
  });

  app.post('/api/teas/new', function (req, res) {
    Tea.find({ title: req.body.tea.title }, function (err, tea) {
      if (tea && tea.length > 0) {
        res.send({ message: 'Already have a tea of that name!' });
      } else {
        Category.findById(req.body.catId, function (err, cat) {
          if (err) {
            throw err;
          };
          cat.save(function (err) {
            if (err) {
              throw err;
            };
            var newTea = new Tea({
              title: req.body.tea.title,
              description: req.body.tea.description,
              origin: req.body.tea.origin,
              caffeine: req.body.tea.caffeine,
              steeptime: req.body.tea.steeptime,
              category: cat._id
            });
            newTea.save(function (err, tea) {
              if (err) {
                throw err;
              };
              res.send({ message: 'New tea added', newTea: tea });
            });
            cat.teas.push(newTea);
            cat.save();
          });
        });
      }
    });
  });

  app.post('/api/category/new', function (req, res) {
    Category.findOne({ title: req.body.title }, function (err, cat) {
      if (cat) {
        res.send({ message: 'You already have a category of that title.', category: null });
      } else {
        var newCategory = new Category({
          title: req.body.title,
          background: '#212121'
        });
        newCategory.save(function (err, cat) {
          if (err) {
            throw err;
          };
          res.send({ message: 'New category created!', category: cat });
        });
      };
    });
  });

  app.post('/api/category/delete/:catId', function (req, res) {
    Category.findById({ _id: req.params.catId }, function (err, cat) {
      res.send({ cat: cat });
      cat.remove();
    });
  });

  app.get('/api/teas/:teaId/category', function (req, res) {
    Tea.findOne({ _id: req.params.teaId }).populate('category', 'background').exec(function (err, tea) {
      if (err) {
        throw err;
      };
      res.send({ category: tea.category.title });
    });
  });

  app.get('/api/category/:catId/teas', function (req, res) {
    Category.findOne({ _id: req.params.catId }).populate('tea').exec(function (err, cat) {
      if (err) {
        throw err;
      };
      res.send({ teas: cat.teas });
    });
  });
};
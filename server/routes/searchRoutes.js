const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Tea = mongoose.model('Tea');

module.exports = app => {
  app.get('/api/search/:term', (req, res) => {
    Tea.find({$text: { $search: req.params.term }}, (err, found) => {
      if (err) { throw err };
      res.send(found);
    });
  });
}

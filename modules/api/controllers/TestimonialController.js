var Testimonial = require('../../../models/testimonial');

module.exports.create = function(req, res) {
  if ( req.params.language ) {
    var testimonial = new Testimonial();
    testimonial.language = req.params.language;
    testimonial.save(function(err) {
      return res.status(200).end();
    })
  } else {
    return res.status(404).end();
  }
};

module.exports.delete = function(req, res) {
  Testimonial.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      res.end();
    }
    else {
      res.status(404).end();
    }
  });
};

module.exports.sort = function(req, res) {
  var ids = req.body.ids;
  if ( ids ) {
    ids.forEach(function(_id, _index){
      Testimonial.findByIdAndUpdate(_id, { $set: { sortOrder: _index }}, function (err, element) { });
    });
    res.end();
  } else {
    res.status(404);
  }
};

module.exports.update = function(req, res) {
  if ( req.params.id && ( req.body.hasOwnProperty('emphesis') || req.body.hasOwnProperty('author') ) ) {
    var update = {};
    if ( req.body.hasOwnProperty('emphesis') )
      update.emphesis = req.body.emphesis;
    if ( req.body.hasOwnProperty('author') )
      update.author = req.body.author;
    Testimonial.findByIdAndUpdate(req.params.id, { $set: update }, function (err, element) {
      res.end();
    });
  } else
    res.status(404);
};

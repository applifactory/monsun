var Person = require('../../../models/person'),
    normalize = require('../../../utils/NormalizeString.js');

module.exports.create = function(req, res) {
  if ( req.body.name, req.body.language ) {
    var person = new Person();
    person.name = req.body.name;
    person.language = req.body.language;
    person.save(function(err){
      if ( err )
        res.status(400).json(err);
      else
        res.json({
          id: person._id,
          name: person.name
        });
    })
  } else
    res.status(400).end();
};

module.exports.update = function(req, res) {
  if ( req.params.id ) {
    var update = {};
    if ( req.body.name ) {
      update.name = req.body.name;
      update.link = normalize(req.body.name).replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
    }

    if ( req.body.description )
      update.description = req.body.description;

    if ( req.body.linkedIn )
      update.linkedIn = req.body.linkedIn;

    Person.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: update
    }, function(err){
      if (err)
        res.status(400).end();
      else
        res.end();
    });

  } else
    res.status(400).end();
};

module.exports.sort = function(req, res) {
  var ids = req.body.ids;
  if ( ids ) {
    ids.forEach(function(_id, _index){
      Person.findByIdAndUpdate(_id, { $set: { sortOrder: _index }}, function (err, element) { });
    });
    res.end();
  } else {
    res.status(404);
  }
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  Person.findOne({_id: id}).exec(function(err, person){
    if ( err || !person )
      return res.status(404).end();
    person.remove();
    return res.end();
  });
}

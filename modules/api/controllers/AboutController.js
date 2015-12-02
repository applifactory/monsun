var About = require('../../../models/about'),
    normalize = require('../../../utils/NormalizeString.js');

module.exports.create = function(req, res) {
  if ( req.body.name && req.body.type && req.body.language ) {
    var about = new About();
    about.name = req.body.name;
    about.type = req.body.type;
    about.language = req.body.language;
    about.save(function(err){
      if ( err )
        res.status(400).json(err);
      else
        res.json({
          id: about._id,
          name: about.name,
          link: about.link
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

    if ( req.body.author )
      update.author = req.body.author;

    About.findOneAndUpdate({
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
      About.findByIdAndUpdate(_id, { $set: { sortOrder: _index }}, function (err, element) { });
    });
    res.end();
  } else {
    res.status(404);
  }
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  About.findOne({_id: id}).exec(function(err, about){
    if ( err || !about )
      return res.status(404).end();
    about.remove();
    return res.end();
  });
}

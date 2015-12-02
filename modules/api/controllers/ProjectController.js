var Project = require('../../../models/project'),
    normalize = require('../../../utils/NormalizeString.js');

module.exports.create = function(req, res) {
  if ( req.body.name, req.body.language ) {
    var project = new Project();
    project.name = req.body.name;
    project.link = normalize(req.body.name).replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
    project.language = req.body.language;
    project.save(function(err){
      if ( err )
        res.status(400).json(err);
      else
        res.json({
          id: project._id,
          name: project.name,
          link: project.link
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

    if ( req.body.customer )
      update.customer = req.body.customer;

    if ( req.body.description )
      update.description = req.body.description;

    if ( req.body.status )
      update.status = req.body.status;

    if ( req.body.role )
      update.role = req.body.role;

    if ( req.body.sector )
      update.sector = req.body.sector;

    if ( req.body.solution )
      update.solution = req.body.solution;

    Project.findOneAndUpdate({
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
      Project.findByIdAndUpdate(_id, { $set: { sortOrder: _index }}, function (err, element) { });
    });
    res.end();
  } else {
    res.status(404);
  }
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  Project.findOne({_id: id}).exec(function(err, project){
    if ( err || !project )
      return res.status(404).end();
    project.remove();
    return res.end();
  });
}

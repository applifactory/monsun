var Solution = require('../../../models/solution'),
    normalize = require('../../../utils/NormalizeString.js');

module.exports.create = function(req, res) {
  if ( req.body.name, req.body.language ) {
    var solution = new Solution();
    solution.name = req.body.name;
    solution.link = normalize(req.body.name).replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
    solution.language = req.body.language;
    solution.save(function(err){
      if ( err )
        res.status(400).json(err);
      else
        res.json({
          id: solution._id,
          name: solution.name,
          link: solution.link
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

    if ( req.body.claim )
      update.claim = req.body.claim;

    if ( req.body.description )
      update.description = req.body.description;

    if ( req.body.status )
      update.status = req.body.status;

    if ( req.body.role )
      update.role = req.body.role;

    Solution.findOneAndUpdate({
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
      Solution.findByIdAndUpdate(_id, { $set: { sortOrder: _index }}, function (err, element) { });
    });
    res.end();
  } else {
    res.status(404);
  }
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  Solution.findOne({_id: id}).exec(function(err, solution){
    if ( err || !solution )
      return res.status(404).end();
    solution.remove();
    return res.end();
  });
}

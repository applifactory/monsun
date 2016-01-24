var Text = require('../../../models/text');

module.exports.update = function(req, res) {
  if ( req.body.id, req.body.text ) {
    var _id = req.body.id;
    if ( _id.indexOf('/pl/') < 0 && _id.indexOf('/en/') < 0 )
      _id = '/pl' + _id;
    Text.findOneAndUpdate({
      id: _id
    }, {
      $set: {
        id: _id,
        text: req.body.text
      }
    }, {
      upsert: true
    }, function(err){
      if(err)
        res.status(500).end();
      else
        res.end();
    })
  } else
    res.status(400).end();
};

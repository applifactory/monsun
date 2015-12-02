var Text = require('../../../models/text');

module.exports.update = function(req, res) {
  if ( req.body.id, req.body.text ) {
    Text.findOneAndUpdate({
      id: req.body.id
    }, {
      $set: {
        id: req.body.id,
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

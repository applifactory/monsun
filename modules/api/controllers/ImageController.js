var Project = require('../../../models/project'),
    Image = require('../../../models/image'),
    normalize = require('../../../utils/NormalizeString.js'),
    ImageService = require('../../../utils/ImageService.js'),
    multiparty = require('multiparty');

function saveModel(fileName, model, id, callback) {
  var image = new Image();
  image.file = fileName;
  image[model] = id;
  image.save(function(err){
    callback(err, image);
  });
}

function deleteImage(id, callback) {
  Image.findOne({_id: id}).exec(function(err, image){
    if ( err || !image )
      return callback('error');
    ImageService.deleteImage(image.file);
    image.remove();
    callback();
  });
}

function getSizes(model) {
  return [
    { mode: 'scale', width: 1800, height: 800 },
    { mode: 'crop', width: 280, height: 320, prefix: 's' },
    { mode: 'crop', width: 150, height: 150, prefix: 'thumb' }
  ];
  return null;
}

module.exports.upload = function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if ( err || !files.image || files.image.length < 1 ) return res.status(400).end();
    var file = files.image[0];
    ImageService.saveImage(file, function(err, fileName){
      if ( err )
        return res.status(400).end();
      saveModel(fileName, req.params.model, req.params.id, function(_err, image){
        if ( _err )
          return res.status(400).end();
        res.json({image: image}).end();
      });
    }, getSizes(req.params.model))
  });
};

module.exports.delete = function(req, res) {
  deleteImage(req.params.id, function(err){
    if ( err )
      return res.status(404).end();
    res.end();
  });
};

module.exports.sort = function(req, res) {
  var ids = req.body.ids;
  if ( ids ) {
    ids.forEach(function(_id, _index){
      Image.findByIdAndUpdate(_id, { $set: { sortOrder: _index }}, function (err, element) { });
    });
    res.end();
  } else {
    res.status(404);
  }
};

module.exports.update = function(req, res) {
  if ( req.params.id && req.body.hasOwnProperty('description') ) {
    Image.findByIdAndUpdate(req.params.id, { $set: { description: req.body.description }}, function (err, element) {
      res.end();
    });
  } else
    res.status(404);
};

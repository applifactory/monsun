'use strict';

var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var async = require('async');

var defaultSize = { mode: 'scale', width: 1100, height: 1100 };

function processImage(size, newPath, fileName, fileExt, callback) {
  if ( size.mode == 'crop') {
    gm(newPath).gravity('Center').resize(size.width || defaultSize.width, size.height || defaultSize.height, "^").crop(size.width || defaultSize.width, size.height || defaultSize.height).write('public/fx/' + ( size.prefix ? size.prefix + '-' : '' ) + fileName + ( fileExt ? '.' + fileExt : '' ), function(err){
      if ( err )  callback('processImage error');
      else        callback();
    });
  } else {
    gm(newPath).resize(size.width || defaultSize.width, size.height || defaultSize.height, '>').write('public/fx/' + ( size.prefix ? size.prefix + '-' : '' ) + fileName + ( fileExt ? '.' + fileExt : '' ), function(err){
      if ( err )  callback('processImage error');
      else        callback();
    });
  }
}

module.exports.saveImage = function(file, callback, sizes) {
  var fileName = file.originalFilename.toLowerCase().replace(/(.+)\.([\w\d]+)/gi, '$1').replace(/([\W])/g, '');
  var fileExt = file.originalFilename.toLowerCase().replace(/(.+)\.([\w\d]+)/gi, '$2');
  sizes = sizes || [defaultSize];
  if ( fileName == fileExt )
    fileExt = null;
  fileName += Date.now();
  fs.readFile(file.path, function (err, data) {
    if ( err ) callback(false);
    if ( !fs.existsSync('public/fx/') ) fs.mkdirSync('public/fx/');
    var newPath = 'public/fx/' + fileName + ( fileExt ? '.' + fileExt : '' );
    fs.writeFile(newPath, data, function (err) {
      if ( err ) return callback(false);
      async.eachSeries(sizes, function(size, _callback) {
        processImage(size, newPath, fileName, fileExt, _callback);
      }, function ( err ) {
        if( err ) callback(err);
        else      callback(null, fileName + ( fileExt ? '.' + fileExt : '' ));
      });

    });
  });
}

module.exports.deleteImage = function(file, callback) {
  if ( fs.existsSync( 'public/fx/' + file ) ) {
    fs.unlink('public/fx/' + file, function(){});
    fs.unlink('public/fx/s-' + file, function(){});
    fs.unlink('public/fx/thumb-' + file, function(){});
    if ( callback ) callback(true);
  } else {
    if ( callback ) callback(false);
  }
}

'use strict';

var jwt = require('jsonwebtoken');
var validator = require('validator');
var config = require('../config/config.js');

module.exports.exclude = function(paths) {
  global.authExcludePaths = paths;
}

module.exports.authorized = function(req, res, next) {

  if ( global.authExcludePaths && global.authExcludePaths.hasOwnProperty(req.path) ) {
    var methods = global.authExcludePaths[req.path];
    if ( methods && methods.indexOf(req.method) >= 0 ) {
      return next();
    }
  }

  var token = req.header('X-Auth-Token');
  if ( token ) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if ( decoded ) {
        return next();
      } else {
        console.error('requireUserAuth:unauthorized (invalid token)');
        res.status(401).end();
      }
    });
  } else {
    console.error('requireUserAuth:unauthorized (missing token token)');
    res.status(401).end();
  }

};

module.exports.login = function(login, password, stayLogged, callback) {
  if ( (login == 'admin@monsunstudio.com') && password == 'passwd2' ) {
    callback(
      jwt.sign(
        {
          email: login
        },
        config.secret,
        {
          expiresInMinutes: 60 * 24 * ( stayLogged ? 356 : 3 )
        }
      )
    )
  } else {
    callback(false);
  }
}

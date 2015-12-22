var _views = 'app/views/index/',
    truncate = require('../../../utils/TruncateHtml'),
    Text = require('../../../models/text'),
    Project = require('../../../models/project'),
    Image = require('../../../models/image'),
    _ = require('underscore'),
    languages = require('../../../config/languages'),
    config = require('../../../config/config.js'),
    nl2br = require('nl2br'),
    Mailgun = require('mailgun-js');

module.exports.authUser = function(req, res, next) {
  res.locals.isAdmin = req.session.isLoggedIn || false;
  next();
}

module.exports.helpers = function(req, res, next) {
  res.locals.truncate = truncate;
  next();
}

module.exports.languages = function(req, res, next) {
  var lang = ( req.path.indexOf('/pl') == 0 ) ? 'pl' : 'en';
  for ( attr in languages[lang] ) {
    res.locals[attr] = languages[lang][attr];
  }
  res.locals.language = lang;
  next();
}

module.exports.texts = function(req, res, next) {
  var texts = [];
  res.locals.getText = function(id) {
    var text = '';
    texts.forEach(function(_text){
      if ( _text.id == id )
        text = _text.text;
    })
    return text;
  }
  Text.find({}, function(err, _texts){
    texts = _texts;
    next();
  })
}

module.exports.index = function(req, res) {


  var sliderIndex = res.locals.language == 'pl' ? 1 : 0;

  Image
    .find({ slider: sliderIndex })
    .sort('sortOrder _id')
    .exec(function(err, slides){
      res.render(_views+'index', {slides: slides});
    });
};

module.exports.projects = function(req, res) {
  Project
    .find({ language: res.locals.language, category: req.params.category })
    .populate({path: 'images', options: { sort: 'sortOrder _id' }})
    .sort('sortOrder _id')
    .exec(function(err, projects){
      res.render(_views+'projects', {projects: projects});
    });
};

module.exports.projectDetails = function(req, res) {
  Project.findOne({_id: req.params.id}).populate({path: 'images', options: { sort: 'sortOrder _id' }}).exec(function(err, project){
    if ( err || !project )
      res.status(404).redirect( res.locals.prefix + '/' + res.locals.link.projects );
    else
      res.render(_views+'project-details', {project: project});
  });
};

module.exports.studio = function(req, res) {
  res.render(_views+'studio');
};

module.exports.offer = function(req, res) {
  res.render(_views+'offer');
};

module.exports.contact = function(req, res) {
  res.render(_views+'contact');
};

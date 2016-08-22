var _views = 'app/views/index/',
    truncate = require('../../../utils/TruncateHtml'),
    getSeoMeta = require('../../../utils/SeoHelper'),
    Text = require('../../../models/text'),
    Project = require('../../../models/project'),
    Image = require('../../../models/image'),
    Testimonial = require('../../../models/testimonial'),
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
  var lang = ( req.path.indexOf('/en') == 0 ) ? 'en' : 'pl';
  for ( attr in languages[lang] ) {
    res.locals[attr] = languages[lang][attr];
  }
  res.locals.language = lang;
  next();
}

module.exports.seo = function(req, res, next) {
  res.locals.seo = getSeoMeta(req.path);
  next();
}

module.exports.wildcard = function(req, res, next) {
  if ( req.hostname.indexOf('.monsunstudio.com') > 0 ) {
    res.redirect(301, 'http://monsunstudio.com' + req.path);
  } else {
    next();
  }
}

module.exports.texts = function(req, res, next) {
  var texts = [];
  res.locals.getText = function(id) {
    var text = '';
    if ( id.indexOf('/pl') < 0 && id.indexOf('/en') < 0 )
      id = '/pl' + id;
    texts.forEach(function(_text){
      if ( _text.id == id )
        text = _text.text;
    })
    return text;
  }
  Text.find({}, function(err, _texts){
    texts = _texts;
    texts.forEach(function(_text){
      if ( _text.id.indexOf('/pl') < 0 && _text.id.indexOf('/en') < 0 )
        _text.id = '/en' + _text.id;
    })
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
  var query = { language: res.locals.language };
  if ( req.params.category ) {
    query.category = req.params.category;
  }

  Project
    .find(query)
    .populate({path: 'images', match: { cover: true }, options: { sort: 'sortOrder _id' }})
    .sort('sortOrder _id')
    .exec(function(err, projects){
      res.render(_views+'projects', {projects: projects, category: req.params.category });
    });
};

module.exports.projectDetails = function(req, res) {
  Project.findOne({_id: req.params.id}).populate({path: 'images', match: { cover: { $ne: true } }, options: { sort: 'sortOrder _id' }}).exec(function(err, project){
    if ( err || !project )
      res.status(404).redirect( res.locals.prefix + '/' + res.locals.link.projects );
    else
      res.render(_views+'project-details', {project: project, category: req.params.category });
  });
};

module.exports.studio = function(req, res) {
  Testimonial.find({ language: res.locals.language}, function(err, testimonials){
    res.render(_views+'studio', {testimonials: testimonials || []});
  })
};

module.exports.offer = function(req, res) {
  res.render(_views+'offer');
};

module.exports.contact = function(req, res) {
  res.render(_views+'contact');
};

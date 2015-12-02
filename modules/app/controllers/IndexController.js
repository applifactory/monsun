var _views = 'app/views/index/',
    truncate = require('../../../utils/TruncateHtml'),
    Text = require('../../../models/text'),
    Project = require('../../../models/project'),
    Solution = require('../../../models/solution'),
    About = require('../../../models/about'),
    Person = require('../../../models/person'),
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

module.exports.getSolutions = function(req, res, next) {
  Solution
    .find({ language: res.locals.language })
    .populate({path: 'image'})
    .sort('sortOrder _id')
    .exec(function(err, solutions){
      res.locals.solutions = solutions;
      next();
    });
}

module.exports.texts = function(req, res, next) {
  var texts = [];
  res.locals.getText = function(id) {
    var text = '';
    texts.forEach(function(_text){
      if ( _text.id == id )
        text = _text.text;
    })
    console.log(text);
    return text;
  }
  Text.find({}, function(err, _texts){
    texts = _texts;
    next();
  })
}

module.exports.index = function(req, res) {
  Project
    .find({ language: res.locals.language })
    .limit(6)
    .populate({path: 'images', options: { sort: 'sortOrder _id' }})
    .sort('sortOrder _id')
    .exec(function(err, projects){
      res.render(_views+'index', {projects: projects});
    });
};

module.exports.projects = function(req, res) {
  Project
    .find({ language: res.locals.language })
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

module.exports.solutions = function(req, res) {
  Solution
    .find({ language: res.locals.language })
    .populate({path: 'image'})
    .sort('sortOrder _id')
    .exec(function(err, solutions){
      res.render(_views+'solutions');
    });
};

module.exports.aboutUs = function(req, res) {
  About
    .find({ language: res.locals.language })
    .sort('sortOrder _id')
    .exec(function(err, abouts){

      Person
        .find({ language: res.locals.language })
        .populate({path: 'image'})
        .sort('sortOrder _id')
        .exec(function(err, people){
          res.render(_views+'about-us', {abouts: abouts, people: people});
        });
    });
};

module.exports.people = function(req, res) {
  Person
    .find({ language: res.locals.language })
    .populate({path: 'image'})
    .sort('sortOrder _id')
    .exec(function(err, people){
      res.render(_views+'people', {people: people});
    });
};

module.exports.contact = function(req, res) {

  if ( req.body.name && req.body.email && req.body.message ) {
    var title = 'Message from monsunstudio.com contact form';
    var message = '';

    message += '<strong>Sender</strong>: <br />' + req.body.name + ' <' + req.body.email + '>' + "<br /><br />";
    message += '<strong>Message</strong>: <br />' + nl2br(req.body.message) + "<br /><br />";

    var mailgun = new Mailgun( config.mailgun );

    var data = {
      from: req.body.name + ' <' + req.body.email + '>',
      to: config.emailAddress,
      subject: title,
      html: message
    }

    mailgun.messages().send(data, function (err, body) {
      if ( err )  {
        console.error('Send mail error', err);
        res.render(_views+'contact', {emailError: true});
      } else {
        console.log('Success', body);
        res.render(_views+'contact', {emailSent: true});
      }
    });
  } else {
    res.render(_views+'contact');
  }
};

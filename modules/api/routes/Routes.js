'use strict';

var auth = require('../../../utils/AuthService.js');
var textController = require('../controllers/TextController.js');
var projectController = require('../controllers/ProjectController.js');
var solutionController = require('../controllers/SolutionController.js');
var imageController = require('../controllers/ImageController.js');
var aboutController = require('../controllers/AboutController.js');
var personController = require('../controllers/PersonController.js');

module.exports = function(app) {

  //  auth
  app.route('/api*').all(function(req, res, next){
    if ( req.session.isLoggedIn )
      next();
    else
      res.status(401).end();
  });

  //  texts
  app.route('/api/text')
    .post(textController.update);

  //  projects
  app.route('/api/project')
    .post(projectController.create)
    .put(projectController.sort);
  app.route('/api/project/:id')
    .put(projectController.update)
    .delete(projectController.delete);

  //  solutions
  app.route('/api/solution')
    .post(solutionController.create)
    .put(solutionController.sort);
  app.route('/api/solution/:id')
    .put(solutionController.update)
    .delete(solutionController.delete);

  //  about
  app.route('/api/about')
    .post(aboutController.create)
    .put(aboutController.sort);
  app.route('/api/about/:id')
    .put(aboutController.update)
    .delete(aboutController.delete);

  //  images
  app.route('/api/image/:model/:id')
    .post(imageController.upload);
  app.route('/api/image/:id')
    .delete(imageController.delete);
  app.route('/api/image')
    .put(imageController.sort)

  //  people
  app.route('/api/person')
    .post(personController.create)
    .put(personController.sort);
  app.route('/api/person/:id')
    .put(personController.update)
    .delete(personController.delete);

};

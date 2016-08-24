'use strict';

var auth = require('../../../utils/AuthService.js');
var textController = require('../controllers/TextController.js');
var projectController = require('../controllers/ProjectController.js');
var imageController = require('../controllers/ImageController.js');
var testimonialController = require('../controllers/TestimonialController.js');

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

  //  images
  app.route('/api/image/:model/:id')
    .post(imageController.upload);
  app.route('/api/image/:id')
    .put(imageController.update)
    .delete(imageController.delete);
  app.route('/api/image')
    .put(imageController.sort)

  //  testimonials
  app.route('/api/testimonial/:language')
    .post(testimonialController.create);
  app.route('/api/testimonial/:id')
    .put(testimonialController.update)
    .delete(testimonialController.delete);
  app.route('/api/testimonial')
    .put(testimonialController.sort)
};

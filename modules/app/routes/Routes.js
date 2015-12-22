'use strict';

var express = require('express'),
    index = require('../controllers/IndexController.js'),
    admin = require('../controllers/AdminController.js');

module.exports = function(app) {

  app.use(index.authUser);
  app.use(index.languages);
  app.use(index.getSolutions);
  app.use(index.helpers);
  app.use(index.texts);


  var adminRouter = express.Router();
  adminRouter.route('')
    .get(admin.login)
    .post(admin.login);
  adminRouter.route('/logout').get(admin.logout);
  app.use('/admin', adminRouter);


  var plRouter = express.Router();
  plRouter.route('/').get(index.index);
  // plRouter.route('/rozwiazania').get(index.solutions);
  plRouter.route('/studio').get(index.studio);
  // plRouter.route('/ludzie').get(index.people);
  plRouter.route('/oferta').get(index.offer);
  plRouter.route('/kontakt')
    .get(index.contact)
    .post(index.contact);
  plRouter.route('/:category').get(index.projects);
  plRouter.route('/:category/:link/:id').get(index.projectDetails);
  app.use('/pl', plRouter);


  var enRouter = express.Router();
  enRouter.route('/').get(index.index);
  // enRouter.route('/solutions').get(index.solutions);
  enRouter.route('/studio').get(index.studio);
  // enRouter.route('/people').get(index.people);
  enRouter.route('/offer').get(index.offer);
  enRouter.route('/contact')
    .get(index.contact)
    .post(index.contact);
  enRouter.route('/:category').get(index.projects);
  enRouter.route('/:category/:link/:id').get(index.projectDetails);
  app.use('', enRouter);

};

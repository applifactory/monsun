'use strict';

var _ = require('lodash');

module.exports = _.extend(
  require('./env/all'),
  require('./env/' + ( process.env.ENV || 'development' ) ) || {}
);

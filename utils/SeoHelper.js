var seo = require('../config/seo');

module.exports = function(path) {
  return seo.hasOwnProperty(path) ? seo[path] : seo['/'];
}

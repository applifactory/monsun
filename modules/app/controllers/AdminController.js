var _views = 'app/views/admin/';

module.exports.login = function(req, res) {

  if ( req.body.email && req.body.password ) {
    if ( req.body.email == 'admin@monsunstudio.com' && req.body.password == 'passwd2' ) {
      req.session.isLoggedIn = true;
      return res.redirect('/');
    }
  }

  if ( req.session.isLoggedIn )
    return res.redirect('/');
  res.render(_views+'login', {form: req.body});
};

module.exports.logout = function(req, res) {
  req.session.isLoggedIn = false;
  res.redirect('/');
};

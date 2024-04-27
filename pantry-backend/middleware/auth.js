const { requiresAuth } = require('express-openid-connect');

function protected(req, res, next) {
  if (req.oidc.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/user/sign-in');
  }
}

module.exports = { protected };
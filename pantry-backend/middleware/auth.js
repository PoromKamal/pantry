const { requiresAuth } = require('express-openid-connect');

function protected(req, res, next) {
  if (req.oidc.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'Authentication required' });
    res.redirect('/login');
  }
}

module.exports = { protected };
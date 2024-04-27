const express = require('express');
const router = express.Router();
const db = require("../db/index.js");
const { requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.get('/getMe', (req, res) =>{
  if (req.oidc.isAuthenticated()){
    res.send(JSON.stringify(req.oidc.user));
  } else {
    res.send("Not authenticated");
  }
});

//Special sign-in which registers a user in our database
//terrible workaround since i don't feel like figuring out how to
//override the default /login route.
router.get('/sign-in', (req, res) => {
  res.oidc.login({
    returnTo:"/user/registerOrRedirect"
  });
});


router.get("/registerOrRedirect", (req, res) => {
  if(req.oidc.isAuthenticated()){
    // Check if user in the database
    db.registerUser(req.oidc.user.email, req.oidc.user.given_name);
    // TODO: Add redirect to user dashboard (make sure to return res.redirect, instead of just res.redirect)
  }
  res.redirect("http://localhost:3000/"); 
});



module.exports = router;
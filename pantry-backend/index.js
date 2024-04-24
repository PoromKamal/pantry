const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:5000',
  clientID: 'pqldfYOs6ofTUbOlVfJ4xLCVdN6vDJsA',
  issuerBaseURL: 'https://dev-g0gqqbnnagycimmh.us.auth0.com'
};

const app = express();
const port =  5000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//SAMPLE ROUTES, TO BE DELETED LATER
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
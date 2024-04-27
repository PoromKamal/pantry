const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const fs = require('fs');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const { Client } = require('pg');
const db = require("./db/index.js");
const  { GoogleGenerativeAI } = require("@google/generative-ai");

db.initDB();
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:5000',
  clientID: 'pqldfYOs6ofTUbOlVfJ4xLCVdN6vDJsA',
  issuerBaseURL: 'https://dev-g0gqqbnnagycimmh.us.auth0.com',
  routes: {
    login: false,
    callback: "/callback",
    logout: "/logout"
  }
};

const app = express();
const port =  5000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/pantry", require("./routes/pantryRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));
app.use("/recommendation", require("./routes/recommendationRoutes.js"));


app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});




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
const {jwtDecode} = require('jwt-decode');

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
    login: "/login",
    callback: "/callback",
    logout: "/logout"
  },
  afterCallback: async (req, res, session, decodedState) => {
    if (session) {
      const token = jwtDecode(session.id_token)
      
      console.log(session)
      console.log(token)

      const userProfile = {
        email: token.email,
        given_name: token.given_name || token.nickname || null,
        picture: token.picture,
      };

      try {
        console.log(userProfile)
        const userExist = await db.userExists(userProfile.email);
        if (!userExist) {
          await db.registerUser(userProfile.email, userProfile.given_name);
        }
        return {
          ...session,
          userProfile,
        };
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const app = express();
const port =  5000;

app.use(cors({
  origin: 'http://localhost:3000', // Specify the origin of the frontend
  credentials: true // Enable credentials
}));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/pantry", require("./routes/pantryRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));
app.use("/recipe", require("./routes/recipeRoutes.js"));
app.use("/test", require("./routes/testRoutes.js"));
app.use("/finance/", require("./routes/financeRoutes.js"));


app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});




const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const { getRecipe } = require('../controllers/recipeController.js');
const {protected} = require('../middleware/auth.js');

router.get("/", protected, getRecipe);

module.exports = (router);
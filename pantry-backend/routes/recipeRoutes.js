const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const { getRecipe } = require('../controllers/recipeController.js');

router.get("/", requiresAuth(), getRecipe);

module.exports = (router);
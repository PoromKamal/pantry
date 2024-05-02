const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const { getRecipe, addFavouriteRecipe } = require('../controllers/recipeController.js');

router.get("/", requiresAuth(), getRecipe);
router.post("/", requiresAuth(), addFavouriteRecipe);

module.exports = (router);
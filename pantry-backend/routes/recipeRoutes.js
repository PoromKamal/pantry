const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const { getRecipe, addFavouriteRecipe, getFavouriteRecipes} = require('../controllers/recipeController.js');

router.get("/", requiresAuth(), getRecipe);
router.post("/", requiresAuth(), addFavouriteRecipe);
router.get("/favourites", requiresAuth(), getFavouriteRecipes);

module.exports = (router);
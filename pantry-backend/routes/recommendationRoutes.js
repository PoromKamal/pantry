const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const { getRecommendation } = require('../controllers/recommendationController.js');
const {protected} = require('../middleware/auth.js');

router.get("/", protected, getRecommendation);

module.exports = (router);
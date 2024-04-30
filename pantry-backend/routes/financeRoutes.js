const express = require('express');
const router = express.Router();
const {getSpendingBetweenDates} = require('../controllers/financeController.js');
const { requiresAuth } = require('express-openid-connect');

router.get("/getSpending", requiresAuth(), getSpendingBetweenDates);

module.exports = (router);
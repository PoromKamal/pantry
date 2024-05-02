const express = require('express');
const router = express.Router();
const {getSpendingBetweenDates, getAllTimeTopPurchasedItems} = require('../controllers/financeController.js');
const { requiresAuth } = require('express-openid-connect');

router.get("/getSpending", requiresAuth(), getSpendingBetweenDates);
router.get("/getTopItems", requiresAuth(), getAllTimeTopPurchasedItems);

module.exports = (router);
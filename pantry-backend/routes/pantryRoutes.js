const express = require('express');
const { scanReceipt } = require('../controllers/visionController');
const router = express.Router();

router.post("/scanReceipt", scanReceipt);

module.exports = (router);
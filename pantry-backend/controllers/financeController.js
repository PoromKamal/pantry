const asyncHandler = require('express-async-handler');
const userDb = require('../db/user.js');
const financeDb = require('../db/finance.js');

const getSpendingBetweenDates = asyncHandler(async (req, res) => {
  email = req.oidc.user.email;
  let user = await userDb.getUserByEmail(email);

  let startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  let endDate = new Date(Date.now());

  if (req.params.start_date){
    startDate = new Date(req.params.start_date);
  }

  if(req.params.end_date){
    endDate = new Date(req.params.end_date);
  }

  let spending = await financeDb.getSpendingBetweenDates(user.id, startDate, endDate);
  return res.status(200).json({spending: spending});
});

module.exports = {getSpendingBetweenDates}
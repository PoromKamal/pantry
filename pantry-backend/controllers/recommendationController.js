const asyncHandler = require('express-async-handler');
const userDb = require('../db/user.js');

const getRecommendation = asyncHandler(async (req, res) => {
  email = req.oidc.user.email;
  let userId = await userDb.getUserByEmail(email);
  console.log(userId);
  res.send('test');
});

module.exports = { getRecommendation };
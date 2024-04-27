const asyncHandler = require('express-async-handler');
const userDb = require('../db/user.js');

const getRecommendation = asyncHandler(async (req, res) => {
  email = req.oidc.user.email;
  let user = await userDb.getUserByEmail(email);
});

module.exports = { getRecommendation };
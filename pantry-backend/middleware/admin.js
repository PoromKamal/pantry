const dotenv = require("dotenv");
dotenv.config();

function isAdmin(req, res, next) {
  if(req.header("Admin") != process.env.ADMIN_KEY) {
    res.status(401).send("Unauthorized");
  }
  next();
}

module.exports = { isAdmin };
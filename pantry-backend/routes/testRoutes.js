const express = require('express');
const router = express.Router();
const userDb = require('../db/user.js');
const foodItems = require('../dbTestFiles/testItems.js');
const pantryDb = require('../db/index.js');

router.post("/insert_items/", async (req, res) => {
  let email = req.body.email;
  if(!email){
    return res.status(400).json({message: 'Email is required'});
  }
  const user = await userDb.getUserByEmail(email);
  if(!user){
    return res.status(404).json({message: 'User not found'});
  }
  for(let item of foodItems){
    await pantryDb.addItem(item.name, item.quantity, item.price, item.expiration_date, user.id);
  }
  res.status(200).send("Items inserted");
});

module.exports = router;
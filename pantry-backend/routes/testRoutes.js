const express = require('express');
const router = express.Router();
const userDb = require('../db/user.js');
const {foodItems, recipeItems, getHistoricalTestItems} = require('../dbTestFiles/testItems.js');
const pantryDb = require('../db/index.js');
const recipeDb = require('../db/recipe.js');
const {isAdmin} = require("../middleware/admin.js");

router.post("/insert_items/", isAdmin, async (req, res) => {
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

  for(let item of recipeItems){
    await recipeDb.addRecipe(item, user.id);
  }

  res.status(200).send("Items inserted");
});

router.post("/insert/historical_items/", isAdmin, async (req, res) => {
  let email = req.body.email;
  if(!email){
    return res.status(400).json({message: 'Email is required'});
  }
  
  const user = await userDb.getUserByEmail(email);

  if(!user){
    return res.status(404).json({message: 'User not found'});
  }

  const items = getHistoricalTestItems();

  for(let item of items){
    await pantryDb.addItemAtDate(item.name, item.quantity, item.price, item.expiration_date, user.id, item.created_at);
  }

  res.status(200).send("Historical Items Inserted");
}) 

module.exports = router;
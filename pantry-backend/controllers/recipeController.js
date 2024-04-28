const asyncHandler = require('express-async-handler');
const userDb = require('../db/user.js');
const pantryDb = require('../db/index.js');

const recipePrompt = `
Can you recommend me 6 different dishes I can make with these ingredients?
It's ok if I am missing up to a quarter of the ingredients, but it's preferrable that
you recommend me dishes that uses the most of the ingredients I have.
Give me back the result as a comma seperated list of dish names, and nothing else.
If you don't know any dishes that can be made with the ingredients I have, just respond with "None".
Here are the items that I have available in my pantry. If the item is obviously not a food item, you can ignore it:
`

const getRecipe = asyncHandler(async (req, res) => {
  email = req.oidc.user.email;
  let user = await userDb.getUserByEmail(email);

  // Check if it's been a day since the last recommendation
  

  let items = await pantryDb.getItems(user.id);
  if(items.length <= 3){
    return res.status(400).json({"message": "Not enough items in pantry"})
  }
  let ingredients = items.map(item => item.name).join(",");
  let ingredientsString = ingredients.join(", ");
  let prompt = recipePrompt + ingredientsString;
  res.json({user});
});

module.exports = { getRecipe };
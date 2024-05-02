const asyncHandler = require('express-async-handler');
const userDb = require('../db/user.js');
const pantryDb = require('../db/index.js');
const recipeDb = require('../db/recipe.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
const recipeApi = require('../api/recipeAPI.js');


const recipePrompt = `
Can you recommend me 6 different dishes I can make with these ingredients?
It's ok if I am missing up to a quarter of the ingredients, but it's preferrable that
you recommend me dishes that uses the most of the ingredients I have.
Give me back the result as a comma seperated list of dish names, and nothing else.
If you don't know, you can write "None Found".
Here are the items that I have available in my pantry. If the item is obviously not a food item, you can ignore it:
`

const sampleResponse = `Chicken Parmesan, Beef Tacos, Salmon with roasted vegetables, Greek salad, Spaghetti with tomato sauce, Fruit salad`

const getSqlDate = (date) => {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

const retreiveLastRecommendation = async (user) => {
  let lastRecommendation = await recipeDb.getRecipesBetweenDatesForUser(user.id, getSqlDate(new Date(Date.now() - (24 * 60 * 60 * 1000))), getSqlDate(new Date(Date.now())));
  return lastRecommendation;
}

const queueRecipeRequest = async (items) => {
  const itemList = items.map((item) => item.name).join(", ");
  const prompt = recipePrompt + itemList;
  const result = await model.generateContent([prompt]);
  return result.response.text();
};

const getRecipe = asyncHandler(async (req, res) => {
  email = req.oidc.user.email;
  let user = await userDb.getUserByEmail(email);

  const lastRecipe = await retreiveLastRecommendation(user);
  if(lastRecipe.length > 0){
    return res.status(200).json({recipes: lastRecipe});
  }


  let items = await pantryDb.getItems(user.id);
  if(items.length <= 3){
    return res.status(400).json({"message": "Not enough items in pantry"})
  }

  const possibleRecipes = sampleResponse;//await queueRecipeRequest(items); // TODO: UNCOMMENT THIS LINE WHEN READY TO USE GEMINI API

  const result = [];

  for (let recipe of possibleRecipes.split(",")){
    const recipeResult = await recipeApi.searchRecipe(recipe.trim());
    await recipeDb.addRecipe(recipeResult, user.id);
    result.push(recipeResult);
  }

  res.status(200).json({recipes: result});
}); 

const addFavouriteRecipe = asyncHandler(async (req, res) => {
  email = req.oidc.user.email;
  let user = await userDb.getUserByEmail(email);
  const recipeId = req.body.recipeId;
  await recipeDb.addFavouriteRecipe(user.id, recipeId);
  res.status(200).json({message: "Recipe added to favourites"});
});

module.exports = { getRecipe, addFavouriteRecipe };
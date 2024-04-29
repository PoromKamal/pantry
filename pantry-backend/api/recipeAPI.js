/* Wrapper for the recipe API*/
const dotenv = require('dotenv');
dotenv.config();

const apiUrl = process.env.RECIPE_API_URL;
const searchRecipe = async (query) => {
  if(!query){
    return null;
  }
  console.log(query);
  const response = await fetch(`${apiUrl}?type=public&q=${query}&app_id=${process.env.RECIPE_API_APP_ID}&app_key=${process.env.RECIPE_API_KEY}&imageSize=LARGE&imageSize=REGULAR`);
  const data = await response.json();
  // Get the first recipe
  if(!data.hits || data.hits.length === 0){
    return null;
  }
  const firstResult = data.hits[0];
  console.log(firstResult.recipe.images);
  const result = {
    name: firstResult.recipe.label,
    url: firstResult.recipe.url,
    calories: firstResult.recipe.calories,
    fat: firstResult.recipe.totalNutrients.FAT.quantity,
    protein: firstResult.recipe.totalNutrients.PROCNT.quantity,
    carbs: firstResult.recipe.totalNutrients.CHOCDF.quantity,
    image_large: firstResult.recipe.images.LARGE?.url,
    image_regular: firstResult.recipe.images.REGULAR?.url
  }
  return result;
}

module.exports = {searchRecipe};
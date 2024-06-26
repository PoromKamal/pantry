const { Client, Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 100,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const getRecipesBetweenDatesForUser = async (userId, start, end) => {
  const query = `SELECT * FROM recipes WHERE created_at BETWEEN $1 AND $2 and user_id = $3`;
  const res = await pool.query(query, [start, end, userId]);
  return res.rows;
}

const addRecipe = async(recipe, userId) => {
  const query = `INSERT INTO recipes (user_id, url, image_regular, image_large, name, calories, fat, protein, carbs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  const client = await pool.connect();
  try{
    await client.query("BEGIN");
    const res = await client.query(query, [userId, recipe.url, recipe.image_regular, recipe.image_large, recipe.name, recipe.calories, recipe.fat, recipe.protein, recipe.carbs]);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const addFavouriteRecipe = async (userId, recipeId) => {
  const query = `INSERT INTO favouriteRecipes (user_id, recipe_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`;
  const client = await pool.connect();
  try{
    await client.query("BEGIN");
    const res = await client.query(query, [userId, recipeId]);
    await client.query("COMMIT");
    return res.rows[0];
  }
  catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const getFavouriteRecipes = async(userId) => {
  const query = `SELECT * 
                FROM FavouriteRecipes F
                INNER JOIN Recipes R
                ON F.recipe_id = R.id
                WHERE R.user_id = $1`;
  const res = await pool.query(query, [userId]);
  return res.rows;
}

module.exports = {getRecipesBetweenDatesForUser, addRecipe, addFavouriteRecipe, getFavouriteRecipes}
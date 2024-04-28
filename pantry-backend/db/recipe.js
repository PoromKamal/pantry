const { Client, Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const getRecipesBetweenDates = async (start, end) => {
  const query = `SELECT * FROM recipes WHERE created_at BETWEEN $1 AND $2`;
  const res = await pool.query(query, [start, end]);
  return res.rows;
}

const addRecipe = async(recipe, userId) => {
  const query = `INSERT INTO recipes (user_id, url, image_small, image_large, name, calories, fat, protein, carbs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  try{
    const client = await pool.connect();
    await client.query("BEGIN");
    const res = await client.query(query, [userId, recipe.url, recipe.image_small, recipe.image_large, recipe.name, recipe.calories, recipe.fat, recipe.protein, recipe.carbs]);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
}

module.exports = {getRecipesBetweenDates, addRecipe}
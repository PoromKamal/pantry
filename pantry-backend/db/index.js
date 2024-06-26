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

const initDB = async () => {
  // insert all the tables
  const client = await pool.connect();
  await client.query("BEGIN");
  const userTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    given_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  const pantryTable = `CREATE TABLE IF NOT EXISTS pantryItems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER,
    price DECIMAL,
    expiration_date DATE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`; // TODO: Add images

  const recommendationTable = `CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    url VARCHAR(2048),
    image_regular VARCHAR(2048),
    image_large VARCHAR(2048),
    name VARCHAR(255),
    calories DECIMAL,
    fat DECIMAL,
    protein DECIMAL,
    carbs DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
  `;

  const favouriteRecipeTable = `CREATE TABLE IF NOT EXISTS favouriteRecipes (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id)
  )`;

  const dropAll = `DROP TABLE IF EXISTS users CASCADE`;

  try {
    //await client.query(dropAll);
    await client.query(userTable);
    await client.query(pantryTable);
    await client.query(recommendationTable);
    await client.query(favouriteRecipeTable);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const userExists = async (email) => {
  return (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows.length > 0;
}

const registerUser = async (email, given_name) => {
  if (await userExists(email)) {
    return;
  }
  const client = await pool.connect();
  await client.query("BEGIN");
  const insertUserQuery = `INSERT INTO users (email, given_name) VALUES ($1, $2)`;
  const values = [email, given_name];

  try {
    const res = await client.query(insertUserQuery, values);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const getItemId = async (name, user_id) => {
  console.log(name, user_id);
  const client = await pool.connect();
  try {
    const query = `SELECT id FROM pantryItems WHERE name = $1 AND user_id = $2`;
    const res = await client.query(query, [name, user_id]);
    console.log(res.rows[0].id);
    return res.rows[0].id;
  } finally {
    client.release();
  }
}

const getItem = async (id) => {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM pantryItems WHERE id = $1`;
    const res = await client.query(query, [id]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const getItems = async (user_id) => {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM pantryItems WHERE user_id = $1 ORDER BY created_at DESC`;
    const res = await client.query(query, [user_id]);
    return res.rows;
  } finally {
    client.release();
  }
}

const addItem = async (name, quantity = null, price = null, expiration_date = null, user_id) => {
  const client = await pool.connect();
  try {
    const query = `INSERT INTO pantryItems (name, quantity, price, expiration_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, quantity, price, expiration_date, user_id];
    const res = await client.query(query, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const addItemAtDate = async (name, quantity = null, price = null, expiration_date = null, user_id, date) => {
  const client = await pool.connect();
  try {
    const query = `INSERT INTO pantryItems (name, quantity, price, expiration_date, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [name, quantity, price, expiration_date, user_id, date];
    const res = await client.query(query, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const editItem = async (id, name = null, quantity = null, price = null, expiration_date = null) => {
  const client = await pool.connect();
  try {
    const query = `UPDATE pantryItems SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), price = COALESCE($3, price), expiration_date = COALESCE($4, expiration_date) WHERE id = $5 RETURNING *`;
    const values = [name, quantity, price, expiration_date, id];
    const res = await client.query(query, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const deleteItem = async (id) => {
  console.log("id",id);
  const client = await pool.connect();
  try {
    const query = `DELETE FROM pantryItems WHERE id = $1`;
    const res = await client.query(query, [id]);
    console.log(res);
    return res.rowCount;
  } finally {
    client.release();
  }
}

module.exports = {userExists, registerUser, getItemId, initDB, getItem, getItems, addItem, addItemAtDate, editItem, deleteItem};
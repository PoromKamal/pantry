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

  const pantryTable = `CREATE TABLE IF NOT EXISTS pantryItem (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER,
    price DECIMAL,
    expiration_date DATE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`; // TODO: Add images

  const dropAll = `DROP TABLE IF EXISTS users CASCADE`;

  try {
    await client.query(dropAll);
    await client.query(userTable);
    await client.query(pantryTable);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const registerUser = async (email, given_name) => {
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

const getItem = async (id) => {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM pantryItem WHERE id = $1`;
    const res = await client.query(query, [id]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const getItems = async (user_id) => {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM pantryItem WHERE user_id = $1`;
    const res = await client.query(query, [user_id]);
    return res.rows;
  } finally {
    client.release();
  }
}

const addItem = async (name, quantity = null, price = null, expiration_date = null, user_id) => {
  const client = await pool.connect();
  try {
    const query = `INSERT INTO pantryItem (name, quantity, price, expiration_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, quantity, price, expiration_date, user_id];
    const res = await client.query(query, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const editItem = async (id, name = null, quantity = null, price = null, expiration_date = null) => {
  const client = await pool.connect();
  try {
    const query = `UPDATE pantryItem SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), price = COALESCE($3, price), expiration_date = COALESCE($4, expiration_date) WHERE id = $5 RETURNING *`;
    const values = [name, quantity, price, expiration_date, id];
    const res = await client.query(query, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

const deleteItem = async (id) => {
  const client = await pool.connect();
  try {
    const query = `DELETE FROM pantryItem WHERE id = $1`;
    const res = await client.query(query, [id]);
    return res.rowCount;
  } finally {
    client.release();
  }
}

module.exports = {registerUser, initDB, getItem, getItems, addItem, editItem, deleteItem};
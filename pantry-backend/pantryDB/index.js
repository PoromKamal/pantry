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

  const dropAll = `DROP TABLE IF EXISTS users CASCADE`;

  try {
    await client.query(dropAll);
    await client.query(userTable);
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


module.exports = {registerUser, initDB};
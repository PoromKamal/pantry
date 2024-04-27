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

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const res = await pool.query(query, [email]);
  return res.rows[0];
}

module.exports = {getUserByEmail}
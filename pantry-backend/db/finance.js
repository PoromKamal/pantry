const { Client, Pool } = require('pg');
const {createClient} = require('redis');
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

const redisClient = createClient();

redisClient.on("error", function(error) { console.error(error); });
redisClient.connect().then((response) => { console.log("Connected to Redis") });

const getUserSpendingQuery = `SELECT SUM(price) as totalCost, COUNT(id) as items, created_at FROM pantryitems
                              WHERE user_id = $1
                              GROUP BY created_at
                              ORDER BY created_at ASC`


                                                                        // SMH
const getSpendingBetweenDates = async (userId, start = new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 
                                      end = new Date(Date.now())) =>{
  const key = `${userId}-${start.toISOString().split("T")[0]}-${end.toISOString().split("T")[0]}`;
  const cachedData = await redisClient.get(key);
  if(cachedData){
    console.log("CACHE HIT for key: ", key)
    return JSON.parse(cachedData);
  }
  const res = await pool.query(getUserSpendingQuery, [userId]);
  // Set all the totalcost to double type
  res.rows.forEach((row) => {
    row.totalcost = parseFloat(row.totalcost);
  });
  
  // Save to cache 
  redisClient.set(key, JSON.stringify(res.rows));
  
  return res.rows;
}

const getAllTimeTopPurchasedItems = async (userId) => {
  const query = `SELECT name, SUM(quantity) as items, sum(price) as spent FROM pantryitems
                 WHERE user_id = $1
                 GROUP BY name
                 ORDER BY spent DESC
                 LIMIT 50`;
  // TODO: Add to cache
  const res = await pool.query(query, [userId]);
  return res.rows;
};

module.exports = {getSpendingBetweenDates, getAllTimeTopPurchasedItems};
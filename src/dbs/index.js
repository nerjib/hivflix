const { Client } = require('pg');

const dotenv = require('dotenv');

dotenv.config();


const client = new Client({
  connectionString: process.env.DATATYPE === 'test' ? process.env.DATABASE_URL1 : process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});/*/
const client = new Client({
  connectionString: process.env.DATATYPE === 'test' ? process.env.DATABASE_URL1 : process.env.DATABASE_URL
})*/
client.connect();

module.exports = client;

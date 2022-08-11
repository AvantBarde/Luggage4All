// Connect to DB
const { Client } = require('pg');
require ('dotenv').config();

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'grace_shopper';

// const DB_URL =
//   process.env.DATABASE_URL;



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});



// github actions client config
// if (process.env.CI) {
//   client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//   });
// } else {
  // local / heroku client config
  // client = new Client(DB_URL);
// }

module.exports = client;
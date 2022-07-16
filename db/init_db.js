const { client, } = require("./");
const { createUser } = require('./models')

async function buildTables() {
  try {
    client.connect();
    console.log("Starting to build tables..");
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      `);
    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        imageURL varchar(255) DEFAULT 'https://imgur.com/a/PGDVLp1',
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) UNIQUE NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT false
      ) 
    `);
    await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY, 
          name varchar(255) NOT NULL,
          description varchar(255) NOT NULL,
          price INTEGER NOT NULL,
          imageURL varchar(255) DEFAULT "https://imgur.com/a/lRObdTa",
          inStock BOOLEAN NOT NULL DEFAULT false,
          category varchar(255) NOT NULL
        )
    `);
    await client.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          status varchar(255) DEFAULT "created",
          userId INTEGER REFERENCES users,
          datePlaced TIMESTAMP DEFAULT NOW()
        )
    `);
    await client.query(`
        CREATE TABLE order_products(
          id SERIAL PRIMARY KEY,
          productId INTEGER REFERENCES products.id,
          orderId INTEGER REFERENCES orders.id,
          price INTEGER NOT NULL,
          quantity INTEGER DEFAULT 0
        )
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const usersToCreate = await createUser(
      {
        username: "albert",
        password: "bertie99",
        email: "bertie99@hotmail.com",
      },
      { username: "sandra", password: "sandra123", email: "sandra321@aol.com" },
      {
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal321@gmail.com",
      }
    );
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

const { client, } = require(".");
const { createUser } = require('./models')

async function buildTables() {
  try {
    client.connect();
    console.log("Starting to build tables..");
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS reviews;
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
        "imageURL" TEXT DEFAULT 'https://imgur.com/a/PGDVLp1',
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
          imageURL TEXT DEFAULT "https://imgur.com/a/lRObdTa",
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
    await client.query(`
     CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users.id,
      productId INTEGER REFERENCES products.id,
      price INTEGER NOT NULL,
      quantity INTEGER DEFAULT 0
    )
    `);

     await client.query(`
     CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      title varchar(255) NOT NULL,
      content varchar(255) NOT NULL,
      stars INTEGER NOT NULL,
      check(
        stars >= 1
        AND stars <= 5
      ),
      productId INTEGER REFERENCES products.id,
      userId INTEGER REFERENCES users.id,
      dateCreated TIMESTAMP DEFAULT NOW()
    )
    `);
      


    console.log("Tables built successfully!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log("Starting to populate initial data..");
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

    const productsToCreate = await products.createProduct(
      {
        name: "Twill Duffle Bag",
        description: "A duffle bag made of twill.",
        price: 100,
        imageURL: "https://filson-canto.imgix.net/cdnnn3e0st2sdaofrekh6rn866/E5To00QWyU3S3EZGsv1BcPTVslw/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
        inStock: true,
        category: "travel",
      },
      {
        name: "Rugged Wallet",
        description: "A rugged wallet made of leather.",
        price: 200,
        imageURL: "https://filson-canto.imgix.net/fmkjhfb4et1udejmtie9lm4531/CIA-Mo1mP9IVCjyTzK_WCDFz9Yg/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
        inStock: true,
        category: "accessories",
      },
      {
        name: "Nylon Backpack",
        description: "A backpack made of nylon.",
        price: 150,
        imageURL: "https://filson-canto.imgix.net/j80aek5got1bp875cieia40h5c/i2vME2dJT-dLhVLT2oIPnHS42HY/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
        inStock: true,
        category: "school",
      },
      {
        name: "Leather Briefcase",
        description: "A leather briefcase.",
        price: 250,
        imageURL: "https://cdn.shopify.com/s/files/1/1301/7071/products/maverick-co-manhattan-leather-briefcase-navy-tiger-orange-grey-1_1800x1800.jpg?v=1630580387",
        inStock: true,
        category: "work",
      },
      {
        name: "Cloth Messenger Bag",
        description: "A messenger bag made of cloth.",
        price: 100,
        imageURL: "https://herschel.com/content/dam/herschel/products/10664/10664-00919-OS_01.jpg.sthumbnails.1000.1250.jpg",
        inStock: true,
        category: "work",
      }
    );

    const ordersToCreate = await orders.createOrder(
      {
        status: "created",
        userId: 1,
        datePlaced: new Date(),
      },
      {
        status: "created",
        userId: 2,
        datePlaced: new Date(),
      },
      {
        status: "created",
        userId: 3,
        datePlaced: new Date(),
      }
    );

    const orderProductsToCreate = await orderProducts.createOrderProduct(
      {
        productId: 1,
        orderId: 1,
        price: 100,
        quantity: 1,
      },
      {
        productId: 2,
        orderId: 1,
        price: 200,
        quantity: 1,
      },
      {
        productId: 3,
        orderId: 1,
        price: 150,
        quantity: 1,
      },
      {
        productId: 4,
        orderId: 2,
        price: 250,
        quantity: 1,
      }
    );

    const reviewsToCreate = await reviews.createReview(
      {
        title: "Great product!",
        content: "This is a great product!",
        stars: 5,
        productId: 1,
        userId: 1,
        dateCreated: new Date(),
      },
      {
        title: "Not what I expected",
        content: "This is not what I expected.",
        stars: 3,
        productId: 2,
        userId: 2,
        dateCreated: new Date(),
      },
      {
        title: "Like Costco, but not.", 
        content: "This ain't no Kirkland's Best.",
        stars: 4,
        productId: 3,
        userId: 3,
        dateCreated: new Date(),
      }
    );

    const cartToCreate = await cart.createCart(
      {
        userId: 1,
        productId: 1,
        price: 100,
        quantity: 1,
      },
      {
        userId: 2,
        productId: 2,
        price: 200,
        quantity: 2,
      },
      {
        userId: 3,
        productId: 3,
        price: 150,
        quantity: 1,
      }
    );

    console.log("Initial data populated successfully!");

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

const {
  // declare your model imports here
  // for example, User
  Products,
  Orders,
  Users,
  Order_Products,
  Reviews,
  Cart,
} = require('./models');

const client = require('./client.js');


async function buildTables() {
  try {
    client.connect();
    console.log("Starting to build tables..");
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS cart CASCADE;
      DROP TABLE IF EXISTS reviews CASCADE;
      DROP TABLE IF EXISTS order_products CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      `);
    // build tables in correct order
    console.log("creating user tables..");
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" varchar(255) NOT NULL,
        "lastName" varchar(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" TEXT DEFAULT 'https://imgur.com/a/PGDVLp1',
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      ) 
    `);

    console.log('creating products tables...')
    await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY, 
          name varchar(255) NOT NULL,
          description varchar(255) NOT NULL,
          price INTEGER NOT NULL,
          "imageURL" TEXT DEFAULT 'https://imgur.com/a/lRObdTa',
          "inStock" BOOLEAN NOT NULL DEFAULT false,
          category varchar(255) NOT NULL
        )
    `);

    console.log('creating orders tables...');
    await client.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          status varchar(255) DEFAULT 'created',
          "userId" INTEGER REFERENCES users(id),
          "datePlaced" TIMESTAMP DEFAULT NOW()
        )
    `);

    console.log('creating order_products tables...');
    await client.query(`
        CREATE TABLE order_products(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price INTEGER NOT NULL,
          quantity INTEGER DEFAULT 0
        )
    `);

    console.log('creating cart tables...');
    await client.query(`
     CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER,
      UNIQUE ("userId", "productId")
    )
    `);

    console.log('creating reviews tables...');
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
      "productId" INTEGER REFERENCES products(id),
      "userId" INTEGER REFERENCES users(id),
      "dateCreated" TIMESTAMP DEFAULT NOW()
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
    const user1 = await Users.createUser(
      {
        firstName: 'Albert',
        lastName: 'Bertie',
        username: "albert",
        password: "bertie99",
        email: "bertie99@hotmail.com",
      })
    const user2 = await Users.createUser(
      { 
      firstName: 'Albert',
      lastName: 'Bertie',
      username: "sandra", 
      password: "sandra123", 
      email: "sandra321@aol.com" }
    )
    const user3 = await Users.createUser(
      {
        firstName: 'Albert',
        lastName: 'Bertie',
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal321@gmail.com",
      }
    );

    const product1 = await Products.createProduct(
      {
        name: "Twill Duffle Bag",
        description: "A duffle bag made of twill.",
        price: 100.00,
        imageURL: "https://filson-canto.imgix.net/cdnnn3e0st2sdaofrekh6rn866/E5To00QWyU3S3EZGsv1BcPTVslw/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
        inStock: true,
        category: "travel",
      })
      const product2 = await Products.createProduct(
      {
        name: "Rugged Wallet",
        description: "A rugged wallet made of leather.",
        price: 200.00,
        imageURL: "https://filson-canto.imgix.net/fmkjhfb4et1udejmtie9lm4531/CIA-Mo1mP9IVCjyTzK_WCDFz9Yg/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
        inStock: true,
        category: "accessories",
      })
      const product3 = await Products.createProduct(
        {
          name: "Nylon Backpack",
          description: "A backpack made of nylon.",
          price: 150.00,
          imageURL: "https://filson-canto.imgix.net/j80aek5got1bp875cieia40h5c/i2vME2dJT-dLhVLT2oIPnHS42HY/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
          inStock: true,
          category: "school",
        })
      const product4 = await Products.createProduct(
        {
          name: "Leather Briefcase",
          description: "A leather briefcase.",
          price: 250.00,
          imageURL: "https://cdn.shopify.com/s/files/1/1301/7071/products/maverick-co-manhattan-leather-briefcase-navy-tiger-orange-grey-1_1800x1800.jpg?v=1630580387",
          inStock: true,
          category: "work",
        })
      const product5 = await Products.createProduct(
        {
          name: "Cloth Messenger Bag",
          description: "A messenger bag made of cloth.",
          price: 100.00,
          imageURL: "https://herschel.com/content/dam/herschel/products/10664/10664-00919-OS_01.jpg.sthumbnails.1000.1250.jpg",
          inStock: true,
          category: "work",
        });

    const ordersToCreate = await Orders.createOrder(
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

    const orderProduct1 = await Order_Products.addProductToOrder(
      {
        productId: 1,
        orderId: 1,
        price: 100.00,
        quantity: 1,
      })
    const orderProduct2 = await Order_Products.addProductToOrder(
      {
        productId: 2,
        orderId: 1,
        price: 200,
        quantity: 1,
      })
    const orderProduct3 = await Order_Products.addProductToOrder(
      {
        productId: 3,
        orderId: 1,
        price: 150,
        quantity: 1,
      })
    const orderProduct4 = await Order_Products.addProductToOrder(
      {
        productId: 4,
        orderId: 2,
        price: 250,
        quantity: 1,
      });

    const review1 = await Reviews.addReview(
      {
        title: "Great product!",
        content: "This is a great product!",
        stars: 5,
        productId: 1,
        userId: 1,
        dateCreated: new Date(),
      })
    const review2 = await Reviews.addReview(
      {
        title: "Not what I expected",
        content: "This is not what I expected.",
        stars: 3,
        productId: 2,
        userId: 2,
        dateCreated: new Date(),
      })
    const review3 = await Reviews.addReview(
      {
        title: "Like Costco, but not.", 
        content: "This ain't no Kirkland's Best.",
        stars: 4,
        productId: 3,
        userId: 3,
        dateCreated: new Date(),
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

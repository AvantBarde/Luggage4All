const {
  // declare your model imports here
  // for example, User
  Products,
  Orders,
  Users,
  Order_Products,
  Reviews,
  Admins,
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

    console.log("creating admin tables..");
    await client.query(`
    CREATE TABLE admins(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isadmin BOOLEAN NOT NULL DEFAULT true
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
    console.log("Creating public users...");
    const publicUser1 = await Users.createUser(
      {
        firstName: 'Albert',
        lastName: 'Bertie',
        username: "albert",
        password: "bertie99",
        email: "bertie99@hotmail.com",
        isAdmin: false,
      })
    const publicUser2 = await Users.createUser(
      { 
      firstName: 'Albert',
      lastName: 'Bertie',
      username: "sandra", 
      password: "sandra123", 
      email: "sandra321@aol.com" ,
      isAdmin: false,
      }
    )
    const publicUser3 = await Users.createUser(
      {
        firstName: 'Albert',
        lastName: 'Bertie',
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal321@gmail.com",
        isAdmin: false,
      }
    );

    const publicUser4 = await Users.createUser(
      {
        firstName: 'John',
        lastName: 'Doe',
        username: "john",
        password: "doe123",
        email: "johndoe123@gmail.com",
        isAdmin: false,
      }
    );

    const publicUser5 = await Users.createUser(
      {
        firstName: 'Dwight',
        lastName: 'Schrute',
        username: "dwight",
        password: "schrute123",
        email: "battlestargalactica101@gmail.com",
        isAdmin: false,
      }
    );
    const publicUser6 = await Users.createUser(
      {
        firstName: 'Jim',
        lastName: 'Halpert',
        username: "tuna",
        password: "halpert123",
        email: "letsprankdwight123@gmail.com",
        isAdmin: false,
      }
    );
    const publicUser7 = await Users.createUser(
      {
        firstName: 'Pam',
        lastName: 'Halpert',
        username: "pam",
        password: "halpert123",
        email: "iloveart123@gmail.com",
        isAdmin: false,
      }
    );
    const publicUser8 = await Users.createUser(
      {
        firstName: 'Pam',
        lastName: 'Halpert',
        username: "pam",
        password: "halpert123",
        email: "iloveart123@gmail.com",
        isAdmin: false,
      }
    );
    
    const publicUser9 = await Users.createUser(
      {
        firstName: 'Stanley',
        lastName: 'Hudson',
        username: "Stanley",
        password: "hudson123",
        email: "whatever123@gmail.com",
        isAdmin: false,
      }
    );

    const publicUser10 = await Users.createUser(
      {
        firstName: 'Andy',
        lastName: 'Bernard',
        username: "andythestar",
        password: "bernard123",
        email: "ridididoooo123@gmail.com",
        isAdmin: false,
      }
    );


    
    
    console.log("creating admin users...");

    const adminUser1 = await Admins.createAdmin(
      {
        firstName: 'Jordan',
        lastName: 'Steger',
        username: "jordan",
        password: "steger123",
        email: "jordansteger123@gmail.com",
        isAdmin: true,
      }
    );

    const adminUser2 = await Admins.createAdmin(
      { 
      firstName: 'David',
      lastName: 'Stein',
      username: "david", 
      password: "stein123", 
      email: "davidsteing123@gmail.com" ,
      isAdmin: true,
      }
    );

    const adminUser3 = await Admins.createAdmin(
      {
        firstName: 'Miles',
        lastName: 'Clark',
        username: "miles",
        password: "clark123",
        email: "milesclark123@gmail.com",
        isAdmin: true,
      }
    );
    
    const adminUser4 = await Admins.createAdmin(
      {
        firstName: 'Bardell',
        lastName: 'Wilson',
        username: "bardell",
        password: "wilson123",
        email: "bardellwilson123@gmail.com",
        isAdmin: true,
      }
    );


    const product1 = await Products.createProduct(
      {
        name: "Twill Duffle Bag",
        description: "A duffle bag made of twill.",
        price: 100.00,
        imageURL: "https://filson-canto.imgix.net/cdnnn3e0st2sdaofrekh6rn866/E5To00QWyU3S3EZGsv1BcPTVslw/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
        inStock: true,
        category: "bags",
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
          category: "bags",
        })
      const product4 = await Products.createProduct(
        {
          name: "Leather Briefcase",
          description: "A leather briefcase.",
          price: 250.00,
          imageURL: "https://cdn.shopify.com/s/files/1/1301/7071/products/maverick-co-manhattan-leather-briefcase-navy-tiger-orange-grey-1_1800x1800.jpg?v=1630580387",
          inStock: true,
          category: "travel",
        })
      const product5 = await Products.createProduct(
        {
          name: "Cloth Messenger Bag",
          description: "A messenger bag made of cloth.",
          price: 100.00,
          imageURL: "https://herschel.com/content/dam/herschel/products/10664/10664-00919-OS_01.jpg.sthumbnails.1000.1250.jpg",
          inStock: true,
          category: "bags",
        });
      const product6 = await Products.createProduct(
        {
          name: "Zip Tote Bag - Large ",
          description: "A leakproof bag made for beachdays.",
          price: 75.00,
          imageURL: "https://herschel.com/content/dam/herschel/products/11066/11066-05293-OS_02.jpg.sthumbnails.1000.1250.jpg",
          inStock: true,
          category: "travel",
        });
      const product7 = await Products.createProduct(
        {
          name: "Zip Tote Bag - Large ",
          description: "A leakproof bag made for beachdays.",
          price: 75.00,
          imageURL: "https://herschel.com/content/dam/herschel/products/11066/11066-05293-OS_02.jpg.sthumbnails.1000.1250.jpg",
          inStock: true,
          category: "travel",
        });
      const product8 = await Products.createProduct(
        {
          name: "Tech Assortment Pouch",
          description: "A bag to rule them all. Keep all your cords, mouse, and everything else you might need organized and protected on the go.",
          price: 50.00,
          imageURL: "https://herschel.com/content/dam/herschel/products/10997/10997-00001-OS_02.jpg.sthumbnails.1000.1250.jpg",
          inStock: true,
          category: "accessories",
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
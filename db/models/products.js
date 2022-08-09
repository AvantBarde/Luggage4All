const client = require('../client');

//Gets All Products And Returns Array With All Products
async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
    SELECT *
    FROM products;`);

    return products;
  } catch (error) {
    console.error('ERROR GETTING ALL PRODUCTS');
    throw error;
  }
}
//Gets Specific Product By Passed In Id
async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id = ($1);
        `,
      [id]
    );

    return product;
  } catch (error) {
    console.error('ERROR GETTING PRODUCT BY ID');
    throw error;
  }
}

//Creates New Product And Returns New Product
async function createProduct(product) {
  const {
    name,
    description,
    price,
    imageURL,
    inStock,
    category,

  } = product;
  try {
    const {
      rows: [newProduct],
    } = await client.query(
      `
        INSERT INTO products(name, description, price, "imageURL", "inStock", category)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [
        name,
        description,
        price,
        imageURL,
        inStock,
        category,
      
      ]
    );

    return newProduct;
  } catch (error) {
    console.error('ERROR CREATING NEW PRODUCT');
    throw error;
  }
}

async function destroyProduct({ id }) {
  try {
    const { rows: [product] } = await client.query(`
    DELETE
    FROM products
    WHERE id = $1
    ;`, [id])

    //  DELETE
    // FROM order_products op
    // INNER JOIN orders o
    // ON op."orderId" = o.id
    // WHERE productId = 1
    // AND o.status != 'completed'
    const { rows: [deletedOrderProduct] } = await client.query(`
    SELECT 
    o.id, o.status, op.id, op."productId", op."orderId"
    FROM orders o
    JOIN "order_products" op on op."orderId" = o.id 
    `, [id])

  }catch(err) {
    console.error("ERROR DELETING PRODUCT")
    throw err
  }
}

async function updateProduct({ id, ...fields}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }" =$${ index+1 }`
  ).join(', ')

  if (setString.length === 0) {
    return
  }
  try {
    const { rows: updatedProduct } = await client.query(`
    UPDATE products
    SET ${setString}
    WHERE id = ${id}
    RETURNING *
    ;`, Object.values(fields))

    return updatedProduct
  } catch(err) {
    console.error("ERROR UPDATING PRODUCT")
    throw err
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  destroyProduct,
  updateProduct
};
const client = require("../client");


async function createProducts({
  name,
  description,
  price,
  imageURL,
  inStock,
  category,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, "imageURL", "inStock", category)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      [name, description, price, imageURL, inStock, category]
    );
    console.log(product);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM products
        `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id=$1
        `,
      [id]
    );
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function attachProductsToOrders(orders) {
  try {
    const { rows } = await client.query(`
    SELECT p.*, op.price, op.quantity, op."orderId"
    FROM products p
    INNER JOIN order_products op ON op."productId"=p.id
    `)
    const ordersWithProducts = orders.map((order) => {
      order.products = [];
      for (let i = 0; i < rows.length; i++) {
        let product = rows[i]
        if (product.orderId === order.id) {
          order.products.push(product)
        }
      }
      return order
    })
    return ordersWithProducts
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createProducts,
  getAllProducts,
  getProductById,
  attachProductsToOrders
};
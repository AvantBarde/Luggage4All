const client = require("../client");

// create and return the new order
async function createOrder({ status, userId }) {
  try {
    const result = await client.query(
      `INSERT INTO orders (status, "userId") VALUES ($1, $2) RETURNING *`,
      [status, userId]
    );
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
}


// return the order, include the order's products
async function getOrderById({ id }) {
  try {
    const result = await client.query(
      `SELECT * FROM orders WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
}

// select and return an array of orders, include their products
async function getAllOrders() {
  try {
    const result = await client.query(
      `SELECT * FROM orders`
    );
    return result.rows;
  }
  catch (error) {
    throw error;
  }
}

// select and return an array of orders made by user, include their products
async function getOrdersByUser({ id }) {
  try {
    const result = await client.query(
      `SELECT * FROM orders WHERE "userId" = $1`,
      [id]
    );
    return result.rows;
  }
  catch (error) {
    throw error;
  }
}

// getOrdersByProduct({ id })
async function getOrdersByProduct({ id }) {
  try {
    const result = await client.query(
      `SELECT * FROM orders WHERE id IN (SELECT "orderId" FROM order_products WHERE "productId" = $1)`,
      [id]
    );
    return result.rows;
  }
  catch (error) {
    throw error;
  }
}

// getCartByUser({ id })
async function getCartByUser({ id }) {
  try {
    const result = await client.query(
      `SELECT * FROM orders WHERE id IN (SELECT "orderId" FROM order_products WHERE "productId" IN (SELECT "productId" FROM order_products WHERE "orderId" IN (SELECT id FROM orders WHERE "userId" = $1 AND status = 'cart')))`,
      [id]
    );
    return result.rows;
  }
  catch (error) {
    throw error;
  }
}


// createOrder({ status, userId })
async function createOrder({ status, userId }) {
  try {
    const result = await client.query(
      `INSERT INTO orders (status, "userId") VALUES ($1, $2) RETURNING *`,
      [status, userId]
    );
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
}


module.exports = {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
};

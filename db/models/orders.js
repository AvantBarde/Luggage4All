const client = require("../client");
const { attachProductsToOrders } = require("./products");

async function createOrders({ status, userId, datePlaced }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders(status, "usersId", "datePlaced")
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [status, userId, datePlaced]
    );
    console.log(order);
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE id=$1
        `,
      [id]
    );
    const finalOrder = await attachProductsToOrders(rows);
    return finalOrder;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//tested
async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
        SELECT * 
        FROM orders;
        `);
    const finalOrders = attachProductsToOrders(orders);
    return finalOrders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrdersByUser({ id }) {
  console.log("orders by users");
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "usersId" = $1;
        `,
      [id]
    );
    console.log("im here");
    const finalOrders = await attachProductsToOrders(rows);
    console.log(finalOrders[0].products);
    return finalOrders;
  } catch (error) {
    console.error("error @ ordersByUsers");
    throw error;
  }
}

async function getOrdersByProduct({ id }) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_products ON order_products."orderId" = orders.id
      WHERE order_products."productId" = $1;
    `,
      [id]
    );

    return attachProductsToOrders(orders);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCartByUser({ id }) {
  try {
    const userOrders = await getOrdersByUser(id);
    const userCart = userOrders.filter((order) => {
      return order.status === "created";
    });
    return userCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createOrders,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
};

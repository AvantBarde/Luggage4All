const client = require("../client");

async function getOrderProductById(id) {
  try {
    const result = await client.query(
      `SELECT * FROM order_products WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
}


async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const { rows: checkProduct } = await client.query(
      'SELECT * FROM order_products WHERE "orderId"=$1 AND "productId"=$2',
      [orderId, productId]
    );
    if (checkProduct) {
      //if product exists then we will update the existing entry
      const { rows: productexists } = await client.query(
        'UPDATE order_products SET price=$1,quantity=quantity + $2 WHERE "orderId"=$3 AND "productId"=$4 RETURNING *',
        [price, quantity, orderId, productId]
      );
      return productexists;
    } else {
      //if product does not exist then we will create the order_product and return it.
      const { rows: createdOrderProduct } = await client.query(
        'INSERT INTO order_products ("orderId", "productId", price, quantity) VALUES ($1,$2,$3,$4) RETURNING *',
        [orderId, productId, price, quantity]
      );
      return createdOrderProduct;
    }
  } catch (error) {
    console.error(
      `Error while updating order pruduct with params id:${id}, price:${price}, quantity:${quantity}`);
      throw error;
  }
}

async function updateOrderProduct({ id, price, quantity }) {
  try {
    const result = await client.query(
      `UPDATE order_products SET price = $1, quantity = $2 WHERE id = $3 RETURNING *`,
      [price, quantity, id]
    );
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
}




async function destroyOrderProduct(id) {
  try {
    const result = await client.query(
      `DELETE FROM order_products WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
};

const client = require("../client");
const { getOrderById } = require("./orders");

async function createOrderProducts({ productId, orderId, price, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      INSERT INTO order_products("productId", "orderId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [productId, orderId, price, quantity]
    );
    console.log(order_product);
    return order_product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrderProductById(id) {
  console.log("getOrderProductById");
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
    SELECT *
    FROM order_products
    WHERE id=$1
    `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const [order] = await getOrderById(orderId);
    for (let i = 0; i <= order.products.length; i++) {
      let product = order.products[i];
      if (i === order.products.length) {
        const {
          rows: [orderProduct],
        } = await client.query(`
        INSERT INTO order_products ("orderId", "productId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [orderId, productId, price, quantity]);
        return orderProduct;
      }
      if (product.id === productId) {
        const newPrice = product.price + price
        const newQuant = product.quantity + quantity
        const { rows: [updatedOrderProduct]} = await client.query(
          `
        UPDATE order_products
        SET price=$2, quantity=$3
        WHERE "orderId"=$1
        RETURNING *
        `,
          [orderId, newPrice, newQuant]
        );
        return updatedOrderProduct;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateOrderProduct({ id, price, quantity }) {
  try {
    if (price && quantity) {
      const {
        rows: [updatedOrderProduct],
      } = await client.query(
        `
      UPDATE order_products
      SET price=$2, quantity=$3
      WHERE id=$1
      RETURNING *
      `,
        [id, price, quantity]
      );
      return updatedOrderProduct;
    }
    if(price) {
      const {rows: [updatedOrderProduct]} = await client.query(`
      UPDATE order_products
      SET price=$2
      WHERE id=$1
      RETURNING *
      `, [id, price])
      return updatedOrderProduct
    }
    if (quantity) {
      const {rows: [updatedOrderProduct]} = await client.query(`
      UPDATE order_products
      SET quantity=$2
      WHERE id=$1
      RETURNING *
      `, [id, quantity])
      return updatedOrderProduct
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
async function destroyOrderProduct(id) {
  try {
    const {rows: [deletedOrderProduct]} = await client.query(`
    DELETE FROM order_products
    WHERE id=$1
    `, [id])
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  createOrderProducts,
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct
};

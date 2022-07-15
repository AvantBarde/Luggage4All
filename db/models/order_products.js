const client = require("../client");

async function getOrderProductById(id) {}

async function addProductToOrder({ orderId, productId, price, quantity }) {}

async function updateOrderProduct({ id, price, quantity }) {}

async function destroyOrderProduct(id) {}

module.exports = {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
};

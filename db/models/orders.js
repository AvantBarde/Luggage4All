const client = require("../client");

async function createOrder() {}

async function getOrderById(id) {}

async function getAllOrders() {}

async function getOrdersByUser({ id }) {}

async function getOrdersByProduct({ id }) {}

async function getCartByUser() {}

module.exports = {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
};

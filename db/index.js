const client = require('./client');
const models = require('./models');

const {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct
} = require('./order_products.js');
const {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
} = require('./orders.js')
const {
  getProductById,
  getAllProducts,
  createProduct,
} = require('./products.js')
const {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require('./user.js');

module.exports = {
  client,
  ...require("./products"),
  ...require("./order_products"),
  ...require("./users"),
  ...require("./orders")
};

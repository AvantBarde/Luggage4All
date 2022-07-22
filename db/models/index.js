const client = require('../client');

/***************
* ORDER PRODUCTS *
***************/
const {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct
} = require('./order_products.js');

/***************
* ORDERS  *
***************/

const {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
} = require('./orders.js')

/***************
* PRODUCTS *
***************/
const {
  getProductById,
  getAllProducts,
  createProduct,
} = require('./products.js')

/***************
* USERS  *
***************/
const {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require('./user.js');

module.exports = {
  client,
  /***************
* EXPORTING DB FUNCTIONS (x) *
***************/
//WHEN IMPORTING TO API file, const { x } = require('./db/models'); which refers to this file 
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
  getProductById,
  getAllProducts,
  createProduct,
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};

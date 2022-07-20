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
//WHEN IMPORTING TO API file, const { x } = require('./db/modelss'); which refers to this file 
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
// module.exports = {
//   client,
//   ...require()
//   // add each model to your exports object here
//   // so that you can use them in your express server api routers
//   // for example, create a users.js file for a User model
//   // and User: require('./user') here
// };

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }

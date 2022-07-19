const express = require('express');
const ordersRouter = express.Router();
const { Orders } = require('../db/models')
const { adminRequired } = require('./utils')

// Return a list of orders, include the products with them. requires admin access
ordersRouter.get('/', adminRequired, async (req, res, next) => {
  try {
    const orders = await Orders.getAllOrders()
    res.send(orders)
  } catch (error) {
    next(error)
  }
}
)

module.exports = ordersRouter
const router = require('express').Router()
const { Orders } = require('../db/models')
const { adminRequired } = require('./utils')

// Return a list of orders, include the products with them. requires admin access
router.get('/', adminRequired, async (req, res, next) => {
  try {
    const orders = await Orders.getAllOrders()
    res.send(orders)
  } catch (error) {
    next(error)
  }
}
)


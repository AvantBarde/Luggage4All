const express = require('express');
const ordersRouter = express.Router();
const { Orders } = require('../db/models')
const { adminRequired, requireUser } = require('./utils')
const { Cart } = require('../db/models')

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

//  GET /orders/cart (*)
// Return the current user's order with status='created' (synonymous to a 'cart'). Use database adapter getCartByUser
ordersRouter.get('/cart', requireUser, async (req, res, next) => {
  try {
    const cart = await Cart.getCartByUser(req.user.id)
    res.send(cart)
  } catch (error) {
    next(error)
  }
}
)

// POST /orders (*)
// Create a new order. Should initially be status = created.

ordersRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const order = await Orders.createOrder({status: 'created', userId: req.user.id})
    res.send(order)
  } catch (error) {
    next(error)
  }
}
)

// GET /users/:userId/orders (**)
// Get a list of orders for a particular user.
ordersRouter.get('/:userId', adminRequired, async (req, res, next) => {
  try {
    const orders = await Orders.getOrdersByUser(req.params.userId)
    res.send(orders)
  } catch (error) {
    next(error)
  }
}
)


module.exports = ordersRouter
const express = require("express");
const { getAllOrders, getCartByUser, getOrdersByUser } = require("../db/models/orders");
const { requireUser, requireAdmin, verifyToken } = require("./utils");
const ordersRouter = express.Router();

ordersRouter.get("/test", (req, res) => {
  res.send("oh ya know, just testin' the ordersRouter.");
});

// // GET /orders (*admin) <-- add requireAdmin util? - Zach
// Return a list of orders, include the products with them

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//  GET / orders / cart(*)
// Return the current user's order with status='created' (synonymous to a 'cart'). Use database adapter getCartByUser
ordersRouter.get("/cart", requireUser, verifyToken, async (req, res, next) => {
  try {
    const cart = await getCartByUser(req.user.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// POST / orders(*)
// Create a new order.Should initially be status = created.
ordersRouter.post("/", async (req, res, next) => {
  const { status, userId, datePlaced } = req.body;
  try {
    const order = await createOrders({
      status: status,
      userId: userId,
      datePlaced: datePlaced,
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

//     GET / users /: userId / orders(**)
// Get a list of orders for a particular user.
ordersRouter.post("/:userId/orders", verifyToken, async (req, res, next) => {
  try {
    const orders = await getOrdersByUser(req.params.userId);
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

ordersRouter.post("/:orderId/products", )
module.exports = ordersRouter;

const express = require('express');
const cardRouter = express.Router();
const { Cart, Produts } = require('../db/models');
const { requireUser } = require('./utils');

// post route to add a prouct to the cart database and return the cart
cardRouter.post('/', requireUser, async (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        res.status(400).send('Missing required fields');
    } else {
        try {
        const product = await Produts.getProductById(productId);
        const cart = await Cart.addProductToCart(product, quantity);
        res.send(cart);
        } catch (error) {
        next(error);
        }
    }
    }
);

// update the quantity of a product in the cart
cardRouter.patch('/:productId', requireUser, async (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        res.status(400).send('Missing required fields');
    } else {
        try {
        const product = await Produts.getProductById(productId);
        const cart = await Cart.updateProductInCart(product, quantity);
        res.send(cart);
        } catch (error) {
        next(error);
        }
    }
    }
);

// delete a product from the cart
cardRouter.delete('/:productId', requireUser, async (req, res, next) => {
    const { productId } = req.body;
    if (!productId) {
        res.status(400).send('Missing required fields');
    } else {
        try {
        const product = await Produts.getProductById(productId);
        const cart = await Cart.deleteProductFromCart(product);
        res.send(cart);
        } catch (error) {
        next(error);
        }
    }
    }
);

// remove all products from the cart
cardRouter.delete('/', requireUser, async (req, res, next) => {
    try {
    const cart = await Cart.deleteAllProductsFromCart();
    res.send(cart);
    } catch (error) {
    next(error);
    }
    }
);

// get the total price of the cart
cardRouter.get('/total', requireUser, async (req, res, next) => {
    try {
        const { userId } = req.userId
    const cart = await Cart.getTotalPrice(userId);
    res.send(cart);
    } catch (error) {
    next(error);
    }
    }
);



const express = require("express");
const {
    getAllProducts,
    getProductById,
    createProducts,
} = require("../db/models/products");
const productsRouter = express.Router();



// GET /products
productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (error) {
        next(error);
    }
});

// GET /products/:productId
productsRouter.get("/:productId", async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId);
        res.send(product);
    } catch (error) {
        next(error);
    }
});

//POST /products
// productsRouter.post("/products", async (req, res, next) => {
//     try {
//         const product = await createProducts
//     } catch (error) {
//         next(error);
//     }
// })


module.exports = productsRouter;
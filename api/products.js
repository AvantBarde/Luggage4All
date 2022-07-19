const express = require("express");
const productsRouter = express.Router();
const { Products } = require("../db/models");
const { adminRequired } = require("./utils");

// Route to get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Products.getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
}
);

// route to get product by id
productsRouter.get("/:productId", async (req, res, next) => {
    try {
        const product = await Products.getProductById(req.params.productId);
        res.send(product);
    } catch (error) {
        next(error);
    }
    }
);

// route to create a new product
// THIS WILL NEED TO BE ADMIN ONLY
productsRouter.post("/", adminRequired, async (req, res, next) => {
const { name, description, price, imageURL, inStock, category } = req.body;
if (!name || !description || !price || !category) {
  res.status(400).send("Missing required fields");
}
else {
try {
  const product = await Products.createProduct({
    name,
    description,
    price,
    imageURL,
    inStock,
    category,
  });
  res.send(product);
}
catch (error) {
  next(error);
}
}
}
);

module.exports = productsRouter;
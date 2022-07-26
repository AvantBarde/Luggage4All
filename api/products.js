const express = require("express");
const productsRouter = express.Router();
const { getAllProducts } = require("../db/models");
const { adminRequired } = require("./utils");

// Route to get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
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

// destroyProduct
// destroyProduct({ id })
// hard delete a product.
//  make sure to delete all the order_products whose product is the one being deleted.
// make sure the orders for the order_products being deleted do not have a status = completed


// updateProduct
// updateProduct({ id }, { name, description, price, imageURL, inStock, category })

productsRouter.patch("/:productId", adminRequired, async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, imageURL, inStock, category } = req.body;
  if (!productId || !name || !description || !price || !category) {
    res.status(400).send("Missing required fields");
  }
  else {
  try {
    const product = await Products.updateProduct(productId, {
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
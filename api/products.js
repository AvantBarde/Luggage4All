const productsRouter = require('express').Router();
const { Products, createProduct, destroyProduct, updateProduct, getOrdersByProduct } = require('../db/models');
const { adminRequired } = require('./utils');


//GET /api/products will send back a list of all products in the database
productsRouter.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.getAllProducts();

    if (allProducts) res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

//GET api/products/:productId will look up a product by Id and send it back
productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Products.getProductById(productId);

    if (product) res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', adminRequired, async (req, res, next) => {
  try {
    const { name, description, price, imageURL, inStock, category} = req.body

    const newProduct = await createProduct({name, description, price, imageURL, inStock, category})

    if(newProduct) res.send(newProduct)
  } catch(err) {
    console.error("ERROR CREATING PRODUCT")
    next(err)
  }
})

productsRouter.delete('/:productId', adminRequired, async (req, res, next) => {
 try {
  const productId = req.params.productId
  const deletedProduct = await destroyProduct(productId)

  if(deletedProduct) res.send(deletedProduct)
 } catch(err) {
  console.error("ERROR DELETING PRODUCT")
  next(err)
 }
})

productsRouter.patch('/:productsId', adminRequired, async (req, res, next) => {
  try {
    const productToUpdate = req.body
    productToUpdate.id = req.params.productsId
    const updatedProduct = await updateProduct(productToUpdate)

    if(updatedProduct) res.send(updatedProduct)
  } catch(err) {
    console.error("ERROR UPDATING PRODUCT")
    next(err)
  }
})

productsRouter.get('/:productId/orders', adminRequired, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const ordersWithProduct = await getOrdersByProduct(productId)

    if(ordersWithProduct) res.send(ordersWithProduct)
  } catch(err) {
    console.error("ERROR GETTING ORDERS BY PRODUCT")
    next(err)
  }
})
module.exports = productsRouter;
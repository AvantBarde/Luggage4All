import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../axios-services';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SingleProduct({ cart, setCart, products, setProducts }) {
  // const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const { productId } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const result = await getSingleProduct(productId);
      setProducts(result);
      console.log(result);
    };
    fetchSingleProduct();
  }, [productId]);

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const cartCopy = [...cart];

    // const duplicateProduct = cartCopy.find(
    //   (products) => products.id === productId
    // );

    // if (duplicateProduct) {
    //   duplicateproducts.quantity += products.quantity;
    // } else {
    //   cartCopy.push(products);
    // }

    setCart(cartCopy);
    const newCart = JSON.stringify([...cart, products]);
    localStorage.setItem('cart', newCart);
    let cartTest = JSON.parse(localStorage.getItem('cart'));
    console.log(cartTest);
  };

  return (
    <Card style={{width: '30rem'}} className='single-product'>
      <Card.Img variant="top" src={products.imageURL} alt={products.name}></Card.Img>
      {console.log(products)}
      <div className='product-details'>
        <h2 className='single-product-header'>{products.name}</h2>
        <p>
          ${products.price} {products.size !== `n/a` && ' - ' + products.size}
        </p>
        <p className='product-inStock'>
          {products.inStock === true ? 'In Stock' : 'Out of Stock'}
        </p>
        <p>{products.description}</p>
        {products.origin !== `n/a` && <p>Origin: {products.origin}</p>}
        <p>Category: {products.category}</p>

        <div className='single-product-quantity-group'>
          <p className='single-product-quantity-button'>
            <Button
              variant='outline-dark'
              size='sm'
              onClick={() => {
                handleMinusQuantity();
              }}
            >
              -
            </Button>
            <span className='product-quantiity'>Total: {quantity}</span>
            <Button
              variant='outline-dark'
              size='sm'
              onClick={() => {
                handleAddQuantity();
              }}
            >
              +
            </Button>
          </p>
        </div>

        {products.inStock === true ? (
          <Button
            variant='success'
            type='submit'
            className='single-product-add-to-cart'
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <Button
            variant='secondary'
            type='submit'
            className='single-product-out-of-stock'
          >
            Out of Stock
          </Button>
        )}
      </div>
    </Card>
  
    
  );
}

export default SingleProduct;
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllProducts } from '../axios-services';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AllProducts({products, setProducts}) {
  // const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const result = await getAllProducts();
      setProducts(result);
      console.log(result)
    };
    fetchAllProducts();
  }, []);

  return (
    <div className='all-products'>
      <h2 style = {{textAlign: 'center', marginT: '10px'}}>All Products</h2>
      {Array.isArray(products) ? products.map((product) => {
        return (
          <Card key={product.id} className='products-list' style = {{width: '25rem'}}>
            {product.imageURL && (
              <Card.Img
                variant="top"
                src={product.imageURL}
                className='product-image'
                onClick={() => {
                  history.push(`/products/${product.id}`);
                }}
              ></Card.Img>
            )}
            <p
              className='product-name'
              onClick={() => {
                history.push(`/products/${product.id}`);
              }}
            >

            </p>
          </Card>
        );
      }): console.log("products not an array", products)}
    </div>
  );
}

export default AllProducts;
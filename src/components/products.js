import React, { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

import { getAllProducts, getProducts } from "../axios-services"
import  ProductCard from './productCard';


function Products() {

    const [error, setError] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
 
    useEffect (() => {
        try {
            const response = getAllProducts()
            if (response) {
                setProducts(response)
                setLoading(false)
            } else {
                setError('Error getting products')
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    , [])

    
    



  return (
    <Container className='bg-light' >
        <center><h1>Products</h1></center>
        {Array.isArray(products) ? products.map(product => (
            <ProductCard key={product.productId} 
            name={product.name}
            description={product.description}
            price={product.price}
            imageURL={product.imageURL}
            inStock={product.inStock}
            category={product.category}
             />
        )):
        null}
    </Container>
  )
}

export default Products
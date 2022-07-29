import React, { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

import { getAllProducts, getProducts } from "../axios-services"
import  ProductCard from './productCard';


function Products() {

    const testProdcuts = [
        {
            name: "Twill Duffle Bag",
            description: "A duffle bag made of twill.",
            price: 100,
            imageURL: "https://filson-canto.imgix.net/cdnnn3e0st2sdaofrekh6rn866/E5To00QWyU3S3EZGsv1BcPTVslw/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
            inStock: true,
            category: "travel",
          },
          {
            name: "Twill Duffle Bag",
            description: "A duffle bag made of twill.",
            price: 100,
            imageURL: "https://filson-canto.imgix.net/cdnnn3e0st2sdaofrekh6rn866/E5To00QWyU3S3EZGsv1BcPTVslw/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
            inStock: true,
            category: "travel",
          },
          {
            name: "Twill Duffle Bag",
            description: "A duffle bag made of twill.",
            price: 100,
            imageURL: "https://filson-canto.imgix.net/cdnnn3e0st2sdaofrekh6rn866/E5To00QWyU3S3EZGsv1BcPTVslw/original?h=700&w=1500&bg=ffffff&q=80&auto=format,compress",
            inStock: true,
            category: "travel",
          }
    ]

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
    <Container className='bg-light d-flex flex-row flex-wrap' >
        <center><h1>Products</h1></center>
        {Array.isArray(testProdcuts) ? testProdcuts.map(product => (
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
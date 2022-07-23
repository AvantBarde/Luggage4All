import React, { useState, useEffect } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { getProducts } from '../../db/models/products'
import { getAllProducts } from '../axios-services'
import { ProductCard } from './ProductCard'


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
    <Container>
        <h1>Products</h1>
        {products.map(product => (
            <ProductCard key={product.productId} 
            name={product.name}
            description={product.description}
            price={product.price}
            imageURL={product.imageURL}
            inStock={product.inStock}
            category={product.category}
             />
        ))}
    </Container>
  )
}

export default Products
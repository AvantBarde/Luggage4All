import React from 'react'
import { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { getCart } from "../axios-services"
import CartCard from './cartCard'


function Cart(props) {

    const [cart, setCart] = useState([])
    const [error, setError] = useState('')

    useEffect (() => {
        try {
            const response = getCart(props.userId)
            if (response) {
                setCart(response)
            } else {
                setError('Error getting cart')
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    , [])



  return (
    <Container className='bg-light'>
        <center><h1>Cart</h1></center>
        {Array.isArray(cart) ?  cart.map(product => (
            <CartCard key={product.productId}
            name={product.name}
            description={product.description}
            price={product.price}
            imageURL={product.imageURL}
            inStock={product.inStock}
            category={product.category}
                />
        ))
    :
    null}
    </Container>

  )
}

export default Cart
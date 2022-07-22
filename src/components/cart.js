import React from 'react'
import { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import { getCart } from '../../db/models/cart'


function Cart(props) {

    const [cart, setCart] = useState([])
    const [error, setError] = useState('')

    useEffect (() => {
        try {
            const response = getCart(props.serId)
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
    <Container>
        <h1>Cart</h1>
        {cart.map(product => (
            <CartCard key={product.productId}
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

export default Cart
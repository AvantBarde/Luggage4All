import React from 'react'
import { Card } from 'react-bootstrap'
import DeleteFromCart from './deleteFromCart'


function CartCard() {
    const { name, description, price, imageURL, inStock, category } = props
    



  return (
    <Card>
            <Card.Img variant="top" src={imageURL} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>{price}</Card.Text>
                    <Card.Text>{inStock}</Card.Text>
                    <Card.Text>{category}</Card.Text>
                    <DeleteFromCart userId={props.userId} productId={props.productId} />
                    
                </Card.Body>
            </Card>
  )
}

export default CartCard
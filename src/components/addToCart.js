import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
// import { addProductToCart } from '../../db/models/cart'
import { useHistory } from "react-router-dom";
import { addProductToCart } from "../axios-services"


function AddToCart(props) {

    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addProductToCart(props.userId, props.productId, props.quantity)
            if (response) {
                history.push('/cart')
            } else {
                setError('Error adding to cart')
            }
        }
        catch (error) {
            console.error(error)
        }
    }




  return (
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add to Cart
    </Button>
  )
}

export default AddToCart
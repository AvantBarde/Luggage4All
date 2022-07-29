import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

// useEffect get cart total
const [cartTotal, setCartTotal] = useState(0)

useEffect(() => {
    try {
        // get total cart price
        const response = getCartTotal(props.userId)
        if (response) {
            setCartTotal(response)
        } else {
            setError('Error getting cart total')
        }
    }
    catch (error) {
        console.error(error)
    }
}
, [])


function CheckOut() {
  return (
    <Container className='bg-light'>
        <center><h1>Check Out</h1></center>
    </Container>
  )
}

export default CheckOut
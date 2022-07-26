import React from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
// import { getOrders, getOrdersByUser } from '../../db/models/orders'


function OrderHistory(props) {

    const { userId } = props
    const [error, setError] = useState('')
    const [orders, setOrders] = useState([])

    useEffect (() => {
        try {
            const response = getOrdersByUser(userId)
            if (response) {
                setOrders(response)
            } else {
                setError('Error getting orders')
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    , [])





  return (
    <Container>
        <h1>Order History</h1>
        <ul>
            {orders.map(order => (
                <li key={order.orderId}>
                    <h2>Order #{order.orderId}</h2>
                    <p>{order.datePlaced}</p>
                    <p>{order.status}</p>
                    <p>{order.userId}</p>
                    
                </li>
            ))}
        </ul>
    </Container>
  )
}

export default OrderHistory
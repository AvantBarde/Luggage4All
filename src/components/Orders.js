import React, { useEffect, useState } from 'react'
import { fetchAllOrders } from '../FETCHREQUESTS';
// import { Link } from 'react-router-dom';
import '../style/Orders.css'

function Orders() {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const allOrders = await fetchAllOrders();
                console.log('orders', allOrders)
                setOrdersList(allOrders)
            } catch (error) {
                console.error(error)
            }
        }
        fetchOrders()
    }, [])

    const mappedOrders = ordersList.map((order) => {
        return (
            <div className='product'>
                <h2>I'm an order</h2>
                <p>Order Id:{order.id}</p>
                <p>Order Status:{order.status}</p>
                <p>Products: </p>
                <p>Date Placed: {order.datePlaced}</p>
                <p>user Id: {order.usersId}</p>
            </div>
        )
    })






    return (
        <div className='productContainer'>
            <h1>orders</h1>
            <div className='OrderList'>
                {mappedOrders}
            </div>

        </div>
    )
}

export default Orders
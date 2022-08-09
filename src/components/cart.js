import React, { useEffect, useState } from 'react'

import '../style/Products.css'

function Cart({cartInfo, setCartInfo}) {

      useEffect(() => {
        window.localStorage.setItem('cartInfo', cartInfo);
      }, [cartInfo]);

      const cartData = [{
          id: cartInfo.id, 
          name: cartInfo.name, 
          description: cartInfo.description, 
          price: cartInfo.price, 
          imageURL: cartInfo.imageURL
        }]
        console.log(cartInfo.id)
    return (
        <div>
            {cartData?.map((data) => {
            return (
            <>
            <p>{data.name}</p>
            <p>{data.description}</p>
            <p><img style = {{height: '200px'}} alt = '' src ={data.imageURL}/></p>
            </>
        )})}
        {cartInfo.id ? <button>Check out</button> : null}
        </div>
    )
}

export default Cart
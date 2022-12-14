import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../style/Products.css'

function Cart({cartInfo, setCartInfo}) {

        const history = useHistory();

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
        {cartInfo.id ? <div><button>Check out</button>{cartData.price}</div> : <h1>Nothing In Cart :(</h1>}
        </div>
    )
}

export default Cart
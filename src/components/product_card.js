import React from "react";

import React from 'react'

function product_card({title, imageUrl, body}) {
  return (
    <div className="card-container">
        <div className="image-container">
            <img src={imageUrl} alt='' />        
        </div>
    </div>
  )
}

export default product_card;



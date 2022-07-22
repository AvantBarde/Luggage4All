import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function Products({setToken}) {
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    setToken(localStorage.getItem("token"));


  return (
    <div>products</div>
  )
}

export default Products
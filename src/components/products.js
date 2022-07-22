import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function Products() {
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem("token");


  return (
    <div>products</div>
  )
}

export default Products
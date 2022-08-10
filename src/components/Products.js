import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../FETCHREQUESTS';
import { Link } from 'react-router-dom';
import '../style/Products.css'



function Products() {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const allProducts = await fetchAllProducts();
                console.log('products', allProducts)
                setProductsList(allProducts)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProducts()
    }, [])

    const mappedProducts = productsList.map((product) => {
        return (
            <div className='product'>
                {/* make it so that image and/or product name are a link to a single product. */}
                <img src={product.imageURL} alt={product.description}></img>

                <Link to={`/products/${product.id}`}
                ><h3>{product.name}</h3></Link>

                <div className='row'>
                    <p className='price'>{product.price}</p>
                    <p className='rating'>Product Rating</p>
                </div>
                {/*could add inStock and category? Probably more useful as searchable items? 
                        Out of stock terinary? !inStock => displays <p>Out of Stock!</p> and if inStock => how many remaining
                */}



            </div>
        )
    })


    return (
        <div className='productContainer'>
            <h1>Products</h1>
            <div className='productList'>
                {mappedProducts}
            </div>

        </div>
    )
}

export default Products

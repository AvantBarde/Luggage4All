import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../API';
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
            <div className="productContainer">
                <Link to={`/products/${product.id}`}>
                <h3 className='productName'>{product.name}</h3>
                </Link>
            <div className='product'>
            <Link to={`/products/${product.id}`}>
                {/* make it so that image and/or product name are a link to a single product. */}
                <img src={product.imageURL} alt={product.description}></img>
            </Link>

                <div className='row'>
                    <p className='price'>${product.price}</p>
                    <a href className='rating' >Rate Product</a>
                </div>
                {/*could add inStock and category? Probably more useful as searchable items? 
                        Out of stock terinary? !inStock => displays <p>Out of Stock!</p> and if inStock => how many remaining
                */}



            </div>
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
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleProduct } from '../API';
import '../style/SingleProduct.css'

//pass in id as paramater, left empty just to test out specific products.
function SingleProduct ({setCartInfo}) {
    const { productId } = useParams()
    const [singleProduct, setSingleProduct] = useState([]);

    const history = useHistory();

    useEffect(() => {
        async function fetchDisplayProduct() {
            try {
                const display = await fetchSingleProduct(productId);
                console.log('products', display)
                setSingleProduct(display)
            } catch (error) {
                console.error(error)
            }
        }
        fetchDisplayProduct()
    }, [productId])

    return (
        <div className='singleContainer'>
            <div className='displaySingleProduct'>
                <img className='displaySingleProductIMG' src={`${singleProduct.imageURL}`} alt={singleProduct.description}></img>
                <div className='productInfo'>
                    <div className='productHeader'>
                        <h2 className='singleName'>{singleProduct.name}</h2>
                        <div className='ratings'><span>Rating</span><span>Number of Ratings</span></div>
                    </div>
                    <div className='productDetails'>
                        <p>Price: <span className='price'>{singleProduct.price}</span></p>
                        <p>Description:{singleProduct.description}</p>
                        <p>{singleProduct.inStock}</p>
                        <p>Category: {singleProduct.category}</p>
                        {/*Mary's cart button will replace this one. */}
                        <button onClick={(e) => {
                            e.preventDefault()
                            setCartInfo(singleProduct);
                            history.push('/orders/cart')
                        }
                        }>Add to Cart</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleProduct



import React from 'react'
import { Button } from 'react-bootstrap'
// import { updateProductsInCart } from '../../db/models/cart'


function UpdateProductsInCart(props) {

    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateProductsInCart (props.userId, props.productId, props.quantity)
            if (response) {
                history.push('/cart')
            } else {
                setError('Error updating cart')
            }
        }
        catch (error) {
            console.error(error)
        }
    }





  return (
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Update Products in Cart
    </Button>
    )
}
export default UpdateProductsInCart
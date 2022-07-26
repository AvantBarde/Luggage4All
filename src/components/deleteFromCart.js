import React from 'react'
// import { deleteProductFromCart } from '../../db/models/cart'
import { Button } from 'react-bootstrap'

function DeleteFromCart(props) {

    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await deleteProductFromCart (props.userId, props.productId)
            if (response) {
                history.push('/cart')
            } else {
                setError('Error deleting from cart')
            }
        }
        catch (error) {
            console.error(error)
        }
    }



  return (
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Delete from Cart
    </Button>
  )
}

export default DeleteFromCart
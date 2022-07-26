import React from 'react'
import { Button } from 'react-bootstrap'
// import { getCart } from '../../db/models/cart'


function GetCart(userId) {

    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await getCart (userId)
            if (response) {
                history.push('/cart')
            } else {
                setError('Error getting cart')
            }
        }
        catch (error) {
            console.error(error)
        }
    }




  return (
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Get Cart
    </Button>
  )
}

export default GetCart
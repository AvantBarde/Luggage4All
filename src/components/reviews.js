import React from 'react'
import { useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import { addReview, removeReview, updateReview  } from '../../db/models/reviews'


function Reviews(props) {

    const { productId } = useParams()
    const [error, setError] = useState('')
    const history = useHistory()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [reviewId, setReviewId] = useState('')

    useEffect (() => {
        try {
            const response = getReview(productId)
            if (response) {
                setReview(response.review)
                setRating(response.rating)
                setReviewId(response.reviewId)
            } else {
                setError('Error getting review')
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    , [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addReview(productId, review, rating)
            if (response) {
                history.push('/reviews')
            } else {
                setError('Error adding review')
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await updateReview(productId, reviewId, review, rating)
            if (response) {
                history.push('/reviews')
            } else {
                setError('Error updating review')
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await removeReview(productId, reviewId)
            if (response) {
                history.push('/reviews')
            } else {
                setError('Error deleting review')
            }
        }
        catch (error) {
            console.error(error)
        }
    }







  return (
   <Container>
         <h1>Reviews</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Review</Form.Label>
                    <Form.Control type="text" placeholder="Enter review" value={review} onChange={(e) => setReview(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="text" placeholder="Enter rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                </Form.Group>
                <button type="submit">Submit</button>
            </Form>
            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Review</Form.Label>
                    <Form.Control type="text" placeholder="Enter review" value={review} onChange={(e) => setReview(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="text" placeholder="Enter rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                </Form.Group>
                <button type="submit">Submit</button>
            </Form>
            <Form onSubmit={handleDelete}>
                <button type="submit">Delete</button>
            </Form>
            <p>{error}</p>
        </Container>
        
  )
}

export default Reviews
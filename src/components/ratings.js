import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { addReview } from '../../db/models/reviews'

function Ratings(props) {
    const [stars, setStars] = useState(0)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [reviewStars, setReviewStars] = useState(0)
    

    const getReview = async (productId) => {
      useEffect(() => {
        try {
            const response = getReview(props.productId)
            if (response) {
                setStars(response.stars)
            } else {
                setError('Error getting review')
            }
        }
        catch (error) {
            console.error(error)
        }
        }, [])
    }

    const submitReview = async (e) => {
        e.preventDefault()
        try {
            const response = await addReview(props.productId, title, content, stars)
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

    return (
        <Container>
            {(stars === 0) ? <div>No ratings yet</div> : <div>{stars}</div>}
            {(stars === 1) ? <div>One star</div> : <div>{stars} stars</div>}
            {(stars === 2) ? <div>Two stars</div> : <div>{stars} stars</div>}
            {(stars === 3) ? <div>Three stars</div> : <div>{stars} stars</div>}
            {(stars === 4) ? <div>Four stars</div> : <div>{stars} stars</div>}
            {(stars === 5) ? <div>Five stars</div> : <div>{stars} stars</div>}
            {error && <div>{error}</div>}
            <Container>
                <Form onSubmit={submitReview}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Stars</Form.Label>
                        <Form.Control type="range" min="0" max="5" placeholder="Stars" value={reviewStars} onChange={e => setReviewStars(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </Container>
    ) 
}

export default Ratings
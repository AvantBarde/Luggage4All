import React from 'react'
import { useEffect } from 'react'
import { addReview, removeReview, updateReview  } from '../../db/models/reviews'


function Reviews() {

    const { productId } = useParams()
    const [error, setError] = useState('')
    const history = useHistory()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [reviewId, setReviewId] = useState('')

    useEffect (() => {
        try {
            const response = getReview(productId)




  return (
    <div>Reviews</div>
  )
}

export default Reviews
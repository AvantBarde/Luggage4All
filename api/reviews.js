const express = require('express');
const reviewRouter = express.Router();
const { Reviews } = require('../db/models');
const { requireUser } = require('./utils');

// route to add review to the database
reviewRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, stars, productId, userId } = req.body;
    const alreadyReviewed = await Reviews.checkIfUserHasAlreadyLeftReview({userId, productId});
    if (alreadyReviewed) {
        res.status(400).send('You have already reviewed this product');
    }
    if (!title || !content || !stars || !productId || !userId) {
        res.status(400).send('Missing required fields');
    }
    else {
        try {
            const review = await Reviews.createReview({
                title,
                content,
                stars,
                productId,
                userId,
            });
            res.send(review);
        }
        catch (error) {
            next(error);
        }
    }
}
);

// route for user to delete their own review
reviewRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
    const { reviewId } = req.body;
    if (!reviewId) {
        res.status(400).send('Missing required fields');
    }
    else {
        try {
            const review = await Reviews.removeReview({reviewId});
            res.send(review);
        }
        catch (error) {
            next(error);
        }
    }
}
);

// route for user to update their own review
reviewRouter.patch('/:reviewId', requireUser, async (req, res, next) => {
    const { reviewId, title, content, stars } = req.body;
    if (!reviewId || !title || !content || !stars) {
        res.status(400).send('Missing required fields');
    }
    else {
        try {
            const review = await Reviews.updateReview({reviewId, title, content, stars});
            res.send(review);
        }
        catch (error) {
            next(error);
        }
    }
}
);

// route to get all reviews for a product
reviewRouter.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    if (!productId) {
        res.status(400).send('Missing required fields');
    }
    else {
        try {
            const reviews = await Reviews.getReviewsByProductId(productId);
            res.send(reviews);
        }
        catch (error) {
            next(error);
        }
    }
}
);



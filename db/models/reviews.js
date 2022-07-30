const client = require('../client');

// sql query to add reviews to the reviews table
const addReview = async ({ title, content, stars, productId, userId, dateCreated }) => {
  try {
    const result = await client.query(
      `INSERT INTO reviews (title, content, stars, "productId", "userId", "dateCreated") VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, content, stars, productId, userId, dateCreated]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// sql query to remove reviews from the reviews table
const removeReview = async ({ id }) => {
  try {
    const result = await client.query(
      `DELETE FROM reviews WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// sql query to update reviews in the reviews table
const updateReview = async ({ id, title, content, stars }) => {
  try {
    const result = await client.query(
      `UPDATE reviews SET title = $1, content = $2, stars = $3 WHERE id = $4`,
      [title, content, stars, id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// sql query to get all reviews from the reviews table for a product
const getReviewsByProductId = async ({ id }) => {
    try {
        const result = await client.query(
            `SELECT * FROM reviews WHERE productId = $1`,
            [id]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
}

// sql query to delete all reviews from a user from the reviews table, used when deleting a user
const deleteReviewsByUserId = async ({ userId }) => {
    try {
        const result = await client.query(
            `DELETE FROM reviews WHERE userId = $1`,
            [userId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
}

// sql query to check if user has already left a review on a product, to avoid users leaving multiple reviews on the same product
const checkIfUserHasAlreadyLeftReview = async ({ userId, productId }) => {
    try {
        const result = await client.query(
            `SELECT * FROM reviews WHERE userId = $1 AND productId = $2`,
            [userId, productId]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}






module.exports = { addReview, removeReview, updateReview, checkIfUserHasAlreadyLeftReview, getReviewsByProductId, deleteReviewsByUserId };
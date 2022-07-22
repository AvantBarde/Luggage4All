const client = require("../client");

// sql query to add items to cart
const addProductToCart = async (userId, productId, quantity) => {
    try {
        const { rows: cart } = await client.query(
        `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [userId, productId, quantity]
        );
        return cart;
    } catch (error) {
        console.error(error);
        throw error;
    }
    }
    // sql query to get all items in cart
    const getCart = async (userId) => {
        try {
            const { rows: cart } = await client.query(
            `
            SELECT *
            FROM cart
            WHERE user_id=${userId}
            `
            );
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // sql query to delete item from cart
    const deleteProductFromCart = async (userId, productId) => {
        try {
            const { rows: cart } = await client.query(
            `
            DELETE FROM cart
            WHERE user_id=${userId}
            AND product_id=${productId}
            RETURNING *;
            `
            );
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // sql query to update item in cart
    const updateProductInCart = async (userId, productId, quantity) => {
        try {
            const { rows: cart } = await client.query(
            `
            UPDATE cart
            SET quantity=${quantity}
            WHERE user_id=${userId}
            AND product_id=${productId}
            RETURNING *;
            `
            );
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // sql query to get total price of cart
    const getTotalPrice = async (userId) => {
        try {
            const { rows: cart } = await client.query(
            `
            SELECT SUM(quantity * price) AS total
            FROM cart
            WHERE user_id=${userId}
            `
            );
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    module.exports = {
        addProductToCart,
        getCart,
        deleteProductFromCart,
        updateProductInCart,
        getTotalPrice
    }
    
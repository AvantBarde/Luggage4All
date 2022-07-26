const client = require('../client')


async function createProduct({
name,
description,
price,
imageURL,
inStock,
category
}){
    try {
        const { rows } = await client.query(`
            INSERT INTO products(name, description, price, imageURL, inStock, category)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, imageURL, inStock, category])
        return rows;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function getProductById(id){
    try {
        // product in destructured array because it unpacks a single value from rows 
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1;
        `, [id] )
        return product;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function getAllProducts(){
    try {
        //not in destructured array because we need all the values from rows
        const { rows: products } = await client.query(`
            SELECT *
            FROM products;
        `)
        return products;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

// destroyProduct{(id)}
async function destroyProduct(id){
    try {
        const { rows: product } = await client.query(`
            DELETE FROM products
            WHERE id=$1;
        `, [id] )
        return product;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
    destroyProduct,
}
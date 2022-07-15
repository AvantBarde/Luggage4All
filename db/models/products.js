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
        const { rows: product } = await client.query(`
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
        const { rows: [products] } = await client.query(`
            SELECT *
            FROM products;
        `)
        return products;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
}
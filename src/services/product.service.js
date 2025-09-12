const db = require('../../db');

const createProduct = async (productData) => {
    const {name, description, price, typeid} = productData;
    const {rows} = await db.query(
        'INSERT INTO products (name, description, price, typeid) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, typeid]
    );
    return rows[0];
};


const getProducts = async () => {
    const {rows} = await db.query(
        'SELECT * FROM products'
    );
    return rows;
};


const getProductById = async (id) => {
    const {rows} = await db.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    );
    return rows[0];
};

const updateProduct = async (id, productData) => {
    const {name, description, price, typeid} = productData;
    const {rows} = await db.query(
        'UPDATE products SET name = $1, description = $2, price = $3, typeid = $4 WHERE id = $5 RETURNING *',
        [name, description, price, typeid, id]
    );
    return rows[0];
};

const deleteProduct = async (id) => {
    const {rows} = await db.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
    );
    return rows[0]; 
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

const { getClient } = require('../../db/db');
const redisClient = require('../../db/redisClient');

const getCacheKey = (id, data) => `${id}:${data}`;
const cacheExpirationSeconds = process.env.CACHE_EXPIRATION_SECONDS;


const createProduct = async (productData) => {
    const {name, description, price, typeid} = productData;
    const {rows} = await getClient().query(
        'INSERT INTO products (name, description, price, typeid) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, typeid]
    );

    await invalidateCache(rows[0].id);
    return rows[0];
};


const getProducts = async () => {
    const {rows} = await getClient().query(
        'SELECT * FROM products'
    );
    return rows;
};

const findProductById = async (id, data) => {
    const query = `SELECT ${data} FROM products WHERE id = $1`;
    const {rows} = await getClient().query(query, [id]);
    const product = rows[0];
    return product;
};

const getProductById = async (id) => {
    return findProductById(id, '*');
};


//const getProductById = async (id) => {
//    const {rows} = await db.query(
//        'SELECT * FROM products WHERE id = $1',
//        [id]
//    );
//    return rows[0];
//};

const updateProduct = async (id, productData) => {
    const {name, description, price, typeid} = productData;
    const {rows} = await getClient().query(
        'UPDATE products SET name = $1, description = $2, price = $3, typeid = $4 WHERE id = $5 RETURNING *',
        [name, description, price, typeid, id]
    );
    await invalidateCache(id);
    return rows[0];
};

const deleteProduct = async (id) => {
    const {rows} = await getClient().query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
    );
    await invalidateCache(id);
    return rows[0]; 
};

const getProductByIdShort = async (id) => {
    const data = 'name, price';
    const cacheKey = id;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('Datos obtenidos de la caché');
        return JSON.parse(cachedData);
    }

    console.log('Datos obtenidos de la base de datos');
    const product = await findProductById(id, data);
    
    if (product) {
        await redisClient.setEx(cacheKey, cacheExpirationSeconds, JSON.stringify(product));
    }
    
    return product;
};

const invalidateCache = async (id) => {
    console.log('Invalidando caché');
    await redisClient.del(id); 
    console.log('Caché invalidada');
};


module.exports = {
    createProduct,
    getProducts,
    findProductById,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByIdShort,
    invalidateCache
};

const productService = require('../services/product.service');
const typeService = require('../services/type.service');


const createProduct = async (req, res) => {
    const {name, description, price, typeid} = req.body;
    try {
        // Verificación: el typeid existe en la tabla types
        const idExist = await typeService.getTypeById(typeid);
        if (!idExist) {
            return res.status(404).json({ message: 'El typeID no existe' });
        }

        // Creación del producto
        const newProduct = await productService.createProduct({name, description, price, typeid});

        // Retorno del producto creado
        res.status(201).json(newProduct);
    } catch (err) {
        // Retorno del error
        return res.status(500).json({ error: err.message });
    }
}; 

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};




const getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, description, price, typeid} = req.body;
    try {
        const product = await productService.updateProduct(id, {name, description, price, typeid});
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await productService.deleteProduct(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductByIdShort = async (req, res) => {
    console.log('Obteniendo producto por id corto');
    const {id} = req.params;
    try {
        const product = await productService.getProductByIdShort(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById, 
    updateProduct,
    deleteProduct,
    getProductByIdShort
};
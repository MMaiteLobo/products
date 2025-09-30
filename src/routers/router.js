const express = require('express');
const productController = require('../controllers/product.controller');
const typeController = require('../controllers/type.controller');

const router = express.Router();

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id/short', productController.getProductByIdShort);

router.post('/types', typeController.createType);
router.get('/types', typeController.getTypes);
router.get('/types/:id', typeController.getTypeById);

module.exports = router;




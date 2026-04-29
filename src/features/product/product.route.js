const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const auth = require('../../middleware/auth');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductDetail);
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;

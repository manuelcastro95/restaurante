const express = require('express')
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getProductos);
router.get('/:id', productosController.getProducto)
router.post('/store', productosController.storeProducto)
router.put('/editar/:id', productosController.updateProducto)
router.put('/update-status/:id', productosController.updateStatus)

module.exports = router;

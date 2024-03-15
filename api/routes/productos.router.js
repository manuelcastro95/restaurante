const express = require('express')
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getProductos);
router.get('/:id', productosController.getProducto)
router.put('/editar/:id', productosController.updateProducto)

module.exports = router;

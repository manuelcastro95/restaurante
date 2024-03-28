const express = require('express')
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.listarPedidos);
router.post('/store', pedidosController.storePedido);
router.get('/:id', pedidosController.getPedido);
router.put('/update-status/:id', pedidosController.updateStatus)

module.exports = router;

const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.listarUsuarios);
router.get('/:id', usersController.getUser)
router.post('/store', usersController.storeUser)
router.put('/editar/:id', usersController.updateUser)
router.put('/update-status/:id', usersController.updateStatus)

module.exports = router;

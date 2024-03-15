const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.listarUsuarios);


module.exports = router;

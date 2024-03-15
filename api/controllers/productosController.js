const fs = require('fs/promises');
const path = require('path');

const listarProductos = async (req, res) => {
    res.json({
      productos: 'listado de productos'
    });
}

module.exports = {
  listarProductos
}

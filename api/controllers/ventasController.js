const fs = require('fs/promises');
const path = require('path');

const listarVentas = async (req, res) => {
    res.json({
      ventas: 'listado de Ventas'
    });
}

module.exports = {
  listarVentas
}

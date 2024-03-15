const fs = require('fs/promises');
const path = require('path');

const listarPedidos = async (req, res) => {
    res.json({
      pedidos: 'listado de Pedidos'
    });
}

module.exports = {
  listarPedidos
}

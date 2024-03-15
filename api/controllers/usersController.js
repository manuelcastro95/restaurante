const fs = require('fs/promises');
const path = require('path');

const listarUsuarios = async (req, res) => {
    res.json({
      users: 'listado de Users'
    });
}

module.exports = {
  listarUsuarios
}

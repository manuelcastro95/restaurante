const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/ventas.json');

let ventas = [];

async function cargarVentas() {
  try {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    ventas = JSON.parse(contenido);
  } catch (error) {
  }
}

cargarVentas();

const listarVentas = async (req, res) => {
    res.json(ventas);
}

module.exports = {
  listarVentas
}

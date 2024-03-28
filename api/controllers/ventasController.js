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


const registrarVenta = async (req,res) =>{
  const nuevaVenta = req.body;
  let ultimoId = 0;
  if (ventas.length > 0) {
    const ultimaVenta = ventas[ventas.length - 1];
    ultimoId = ultimaVenta.id;
  }
  nuevaVenta.id = ultimoId + 1

  ventas.push(nuevaVenta);
  await guardarVentas();
  res.json({ mensaje: 'Venta registrada exitosamente'});
}

const guardarVentas = async () => {
  try {
    await fs.writeFile(rutaArchivo, JSON.stringify(ventas, null, 2), 'utf-8');
    console.log('Venta registrada exitosamente.');
  } catch (error) {
    console.error('Error al registrar la venta:', error);
  }
}

module.exports = {
  listarVentas,
  registrarVenta
}

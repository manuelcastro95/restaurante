const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/pedidos.json');

let pedidos = [];

async function cargarPedidos() {
  try {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    pedidos = JSON.parse(contenido);
  } catch (error) {
    console.error('Error al cargar los pedidos:', error);
  }
}

cargarPedidos();

const listarPedidos = async (req, res) => {
  res.json(pedidos);
}

const storePedido = async (req, res) => {
  const nuevoPedido = req.body;
  let ultimoId = 0;
  if (pedidos.length > 0) {
    const ultimoPedido = pedidos[pedidos.length - 1];
    ultimoId = ultimoPedido.id;
  }
  nuevoPedido.id = ultimoId + 1
  pedidos.push(nuevoPedido);
  await guardarPedidos();
  res.json({ mensaje: 'Pedido enviado exitosamente' });
}


const getPedido = async (req, res) => {
  const { id } = req.params;
  const pedido = pedidos.find(p => p.mesa == id && p.estado == 'listo');
  if (pedido) {
    res.json(pedido);
  } else {
    res.json({ mensaje: 'Pedido no encontrado' });
  }
}


const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const indicePedido = pedidos.findIndex(p => p.id == parseInt(id));

  if (indicePedido !== -1) {
    pedidos[indicePedido] = { ...pedidos[indicePedido], ...{ estado: estado } };
    await guardarPedidos();
    res.json({ mensaje: 'Pedido actualizado exitosamente' });
  } else {
    res.json({ mensaje: 'Pedido no encontrado' });
  }
}


const guardarPedidos = async () => {
  try {
    await fs.writeFile(rutaArchivo, JSON.stringify(pedidos, null, 2), 'utf-8');
    console.log('Pedido guardados exitosamente.');
  } catch (error) {
    console.error('Error al guardar el pedido:', error);
  }
}
module.exports = {
  listarPedidos,
  storePedido,
  getPedido,
  updateStatus
}

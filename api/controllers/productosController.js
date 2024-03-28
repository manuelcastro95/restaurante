const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/productos.json');

let productos = [];

async function cargarProductos() {
  try {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    productos = JSON.parse(contenido);
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

cargarProductos();

const getProductos = async (req, res) => {
  res.json(productos.filter(p => p.estado));
}

const storeProducto = async (req, res) => {
  const nuevoProducto = req.body;
  let ultimoId = 0;
  if (productos.length > 0) {
    const ultimoProducto = productos[productos.length - 1];
    ultimoId = ultimoProducto.id;
  }
  nuevoProducto.id = ultimoId + 1
  nuevoProducto.estado = 1
  productos.push(nuevoProducto);
  await guardarProductos();
  res.json({ mensaje: 'Producto insertado exitosamente'});
}


const getProducto = async (req, res) => {
  const { id } = req.params;
  const producto = buscarProducto(parseInt(id));
  if (producto) {
    res.json(producto);
  } else {
    res.json({ mensaje: 'Producto no encontrado' });
  }
}

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const indiceProducto = buscarProductoIndex(parseInt(id));
  if (indiceProducto !== -1) {
    productos[indiceProducto] = { ...productos[indiceProducto], ...datosActualizados };
    await guardarProductos();
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  } else {
    res.json({ mensaje: 'Producto no encontrado' });
  }
}

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const {estado} = req.body;
  const indiceProducto = buscarProductoIndex(parseInt(id));
  if (indiceProducto !== -1) {
    productos[indiceProducto] = { ...productos[indiceProducto], ...{estado:estado} };
    await guardarProductos();
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } else {
    res.json({ mensaje: 'Producto no encontrado' });
  }
}

const buscarProducto = (id) => {
  return productos.find(producto => producto.id === id);
}

const buscarProductoIndex = (id) => {
  return productos.findIndex(producto => producto.id === id);
}
const guardarProductos = async () => {
  try {
    await fs.writeFile(rutaArchivo, JSON.stringify(productos, null, 2), 'utf-8');
    console.log('Productos guardados exitosamente.');
  } catch (error) {
    console.error('Error al guardar los productos:', error);
  }
}

module.exports = {
  getProductos,
  storeProducto,
  getProducto,
  updateProducto,
  updateStatus
}

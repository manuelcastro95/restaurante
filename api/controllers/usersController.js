const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/users.json');

let users = [];

async function cargarUsuarios() {
  try {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    users = JSON.parse(contenido);
  } catch (error) {
  }
}

cargarUsuarios();


const listarUsuarios = async (req, res) => {
  res.json(users);
}


const storeUser = async (req, res) => {
  const nuevoUser = req.body;
  let ultimoId = 0;
  if (users.length > 0) {
    const ultimoUser = users[users.length - 1];
    ultimoId = ultimoUser.id;
  }
  nuevoUser.id = ultimoId + 1
  users.push(nuevoUser);
  await guardarUser();
  res.json({ mensaje: 'Usuario insertado exitosamente' });
}

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = buscarUser(parseInt(id));
  if (user) {
    res.json(user);
  } else {
    res.json({ mensaje: 'Usuario no encontrado' });
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const indiceUser = buscarUserIndex(parseInt(id));
  if (indiceUser !== -1) {
    users[indiceUser] = { ...users[indiceUser], ...datosActualizados };
    await guardarUser();
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } else {
    res.json({ mensaje: 'Usuario no encontrado' });
  }
}


const updateStatus = async (req, res) => {
  const { id } = req.params;
  const {estado} = req.body;

  const indiceUser = buscarUserIndex(parseInt(id));
  if (indiceUser !== -1) {
    users[indiceUser] = { ...users[indiceUser], ...{estado:estado} };
    await guardarUser();
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } else {
    res.json({ mensaje: 'Usuario no encontrado' });
  }
}

const buscarUser = (id) => {
  return users.find(user => user.id == id);
}

const buscarUserIndex = (id) => {
  return users.findIndex(user => user.id == id);
}
const guardarUser = async () => {
  try {
    await fs.writeFile(rutaArchivo, JSON.stringify(users, null, 2), 'utf-8');
    console.log('Productos guardados exitosamente.');
  } catch (error) {
    console.error('Error al guardar los users:', error);
  }
}

module.exports = {
  listarUsuarios,
  storeUser,
  getUser,
  updateUser,
  updateStatus
}

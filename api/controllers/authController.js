const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/users.json');


const login = async (req, res) => {
  const { body } = req;
  let { email, password } = body;
  const contenido = await fs.readFile(rutaArchivo, 'utf-8');
  users = JSON.parse(contenido);

  //donde voy a guardar el usuario si es valido
  let user_select = []

  // recorrer todos los usuarios almacenados en el json
  users.forEach(user => {
    /*
        comparar el usuario que me llega en el post con
        el que tengo almacenado en el json
    */
    if (user.email == email && user.password == password) {
      // si las credenciales son validas
      // asigno el user al user_select
      user_select = user
    }
  });
  // devuelvo los datos del usuario si son correctos
  res.json(user_select)
}


module.exports = {
  login
}

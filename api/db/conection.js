const mongoose = require('mongoose');

require('dotenv').config();


const uri = process.env.MONGODB_URI;


const conexion = () => {
  mongoose.connect(uri);
}

mongoose.connection.on('open', () => {
  console.log('Conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error al conectar a MongoDB:', err);
});


module.exports = conexion


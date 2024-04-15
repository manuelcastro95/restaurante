// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(() => {
  console.log('Conexión exitosa a MongoDB con Mongoose!');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

module.exports = mongoose;

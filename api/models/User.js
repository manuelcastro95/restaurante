const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
    lowercase: true
  },
  apellido: {
    type: String,
    require: false,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  telefono: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: false,
  },
  rol: {
    type: String,
    require: false,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    default: 0
  }
});

// Pre-save hook para hashear la contraseña
userSchema.pre('save', function (next) {
  const user = this;

  // Solo hashear la contraseña si ha sido modificada (o es nueva)
  if (!user.isModified('password')) return next();

  // Generar un "salt"
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // Hashear la contraseña usando el nuevo salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // Reemplazar la contraseña ingresada con el hash
      user.password = hash;
      next();
    });
  });
});



const User = mongoose.model('User', userSchema);

module.exports = User;

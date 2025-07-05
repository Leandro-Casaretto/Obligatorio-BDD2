const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const login = (cc, password, callback) => {
  usuarioModel.verificarUsuario(cc, async (err, results) => {
    if (err) return callback(err);
    
    const usuario = results[0];
    if (!usuario) return callback(null, null);

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return callback(null, null);

    const token = jwt.sign(
      { cc: usuario.cc, ci: usuario.ci },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    callback(null, { usuario, token });
  });
};

const registrarUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    // Verificar si el usuario ya existe
    usuarioModel.getUsuarioPorCC(usuario.cc, (err, existingUser) => {
      if (err) return reject(err);
      if (existingUser) return reject(new Error('El usuario ya existe'));

      // Crear el usuario
      usuarioModel.crearUsuario(usuario, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

module.exports = { login, registrarUsuario };

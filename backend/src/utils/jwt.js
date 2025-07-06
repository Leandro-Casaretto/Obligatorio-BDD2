// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'clave_secreta';

const generarToken = (usuario) => {
  return jwt.sign(usuario, secret, { expiresIn: '1h' });
};

module.exports = { generarToken };

const db = require('../db');
const bcrypt = require('bcrypt');

const getUsuarioPorCC = (cc, callback) => {
  const sql = 'SELECT * FROM Usuario WHERE cc = ? AND habilitado = TRUE';
  db.query(sql, [cc], (err, result) => {
    if (err) return callback(err);
    if (result.length === 0) return callback(null, null);
    callback(null, result[0]);
  });
};

const crearUsuario = (usuario, callback) => {
  const { ci, cc, password } = usuario;
  
  // Hash de la contraseña
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    
    const sql = 'INSERT INTO Usuario (ci, cc, password, habilitado) VALUES (?, ?, ?, TRUE)';
    db.query(sql, [ci, cc, hash], callback);
  });
};

const verificarUsuario = (cc, callback) => {
  const sql = `
    SELECT u.*, p.nombre, p.apellido
    FROM Usuario u
    JOIN Persona p ON u.ci = p.ci
    WHERE u.cc = ? AND u.habilitado = TRUE
  `;
  db.query(sql, [cc], callback);
};

module.exports = {
  getUsuarioPorCC,
  crearUsuario,
  verificarUsuario
};

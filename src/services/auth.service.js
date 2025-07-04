const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (cc, password, callback) => {
  const sql = `
    SELECT u.*, p.nombre, p.apellido
    FROM Usuario u
    JOIN Persona p ON u.ci = p.ci
    WHERE u.cc = ? AND u.habilitado = TRUE
  `;
  db.query(sql, [cc], async (err, results) => {
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

module.exports = { login };

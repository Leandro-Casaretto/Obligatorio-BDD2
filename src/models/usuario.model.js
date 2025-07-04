const db = require('../db');

const getUsuarioPorCC = (cc, callback) => {
  const sql = 'SELECT * FROM Usuario WHERE cc = ? AND habilitado = TRUE';
  db.query(sql, [cc], (err, result) => {
    if (err) return callback(err);
    if (result.length === 0) return callback(null, null);
    callback(null, result[0]);
  });
};

module.exports = {
  getUsuarioPorCC
};

const db = require('../db');

const crearRelacion = (data, callback) => {
  const sql = `
    INSERT INTO Lista_Apoya (id_lista, id_partido, id_senado, id_formula)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [data.id_lista, data.id_partido, data.id_senado, data.id_formula], callback);
};

const getTodas = (callback) => {
  const sql = `
    SELECT la.*, l.numero_lista, p.nombre AS partido, s.nombre AS senado,
           fp.ci_presidente, fp.ci_vicepresidente
    FROM Lista_Apoya la
    JOIN Lista l ON la.id_lista = l.id_lista
    JOIN Partido p ON la.id_partido = p.id_partido
    JOIN Senado s ON la.id_senado = s.id_senado
    JOIN FormulaPresidencial fp ON la.id_formula = fp.id_formula
  `;
  db.query(sql, callback);
};

module.exports = {
  crearRelacion,
  getTodas
};

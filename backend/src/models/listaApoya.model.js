const db = require('../db');

const crearRelacion = (data, callback) => {
  const sql = `
    INSERT INTO lista_apoya (id_lista, id_partido, id_senado, id_formula)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [data.id_lista, data.id_partido, data.id_senado, data.id_formula], callback);
};

const getTodas = (callback) => {
  const sql = `
    SELECT la.*, l.numero_lista, p.nombre AS partido, s.nombre AS senado,
           fp.ci_presidente, fp.ci_vicepresidente
    FROM lista_apoya la
    JOIN lista l ON la.id_lista = l.id_lista
    JOIN partido p ON la.id_partido = p.id_partido
    JOIN senado s ON la.id_senado = s.id_senado
    JOIN formulapresidencial fp ON la.id_formula = fp.id_formula
  `;
  db.query(sql, callback);
};

module.exports = {
  crearRelacion,
  getTodas
};

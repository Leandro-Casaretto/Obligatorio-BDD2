const db = require('../db');

const crearRelacion = (datos, callback) => {
  const sql = `INSERT INTO candidato_lista (ci, id_lista, organo, orden) VALUES (?, ?, ?, ?)`;
  db.query(sql, [datos.ci, datos.id_lista, datos.organo, datos.orden], callback);
};

const getTodasRelaciones = (callback) => {
  const sql = `
    SELECT cl.*, p.nombre, p.apellido, l.numero_lista
    FROM candidato_lista cl
    JOIN persona p ON cl.ci = p.ci
    JOIN lista l ON cl.id_lista = l.id_lista
  `;
  db.query(sql, callback);
};

const getRelacionesPorLista = (id_lista, callback) => {
  const sql = `
    SELECT cl.*, p.nombre, p.apellido
    FROM candidato_lista cl
    JOIN persona p ON cl.ci = p.ci
    WHERE cl.id_lista = ?
  `;
  db.query(sql, [id_lista], callback);
};

module.exports = { crearRelacion, getTodasRelaciones, getRelacionesPorLista };

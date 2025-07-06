const db = require('../db');

const getAllPartidos = (callback) => {
  const sql = 'SELECT * FROM partido';
  db.query(sql, callback);
};

const getPartidoById = (id, callback) => {
  const sql = 'SELECT * FROM partido WHERE id_partido = ?';
  db.query(sql, [id], callback);
};

const createPartido = (partido, callback) => {
  const sql = `
    INSERT INTO partido (nombre, presidente, vicepresidente, direccion_sede)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [partido.nombre, partido.presidente, partido.vicepresidente, partido.direccion_sede], callback);
};

const updatePartido = (id, partido, callback) => {
  const sql = `
    UPDATE partido SET nombre = ?, presidente = ?, vicepresidente = ?, direccion_sede = ?
    WHERE id_partido = ?
  `;
  db.query(sql, [partido.nombre, partido.presidente, partido.vicepresidente, partido.direccion_sede, id], callback);
};

const deletePartido = (id, callback) => {
  const sql = 'DELETE FROM partido WHERE id_partido = ?';
  db.query(sql, [id], callback);
};

module.exports = { getAllPartidos, getPartidoById, createPartido, updatePartido, deletePartido };

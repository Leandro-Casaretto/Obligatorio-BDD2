const db = require('../db');

const getAllPartidos = (callback) => {
  const sql = 'SELECT * FROM Partido';
  db.query(sql, callback);
};

const getPartidoById = (id, callback) => {
  const sql = 'SELECT * FROM Partido WHERE id_partido = ?';
  db.query(sql, [id], callback);
};

const createPartido = (partido, callback) => {
  const sql = `
    INSERT INTO Partido (nombre, presidente, vicepresidente, direccion_sede)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [partido.nombre, partido.presidente, partido.vicepresidente, partido.direccion_sede], callback);
};

const updatePartido = (id, partido, callback) => {
  const sql = `
    UPDATE Partido SET nombre = ?, presidente = ?, vicepresidente = ?, direccion_sede = ?
    WHERE id_partido = ?
  `;
  db.query(sql, [partido.nombre, partido.presidente, partido.vicepresidente, partido.direccion_sede, id], callback);
};

const deletePartido = (id, callback) => {
  const sql = 'DELETE FROM Partido WHERE id_partido = ?';
  db.query(sql, [id], callback);
};

module.exports = { getAllPartidos, getPartidoById, createPartido, updatePartido, deletePartido };

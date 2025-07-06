const db = require('../db');

const getAllElecciones = (callback) => {
  db.query('SELECT * FROM eleccion', callback);
};

const getEleccionById = (id, callback) => {
  db.query('SELECT * FROM eleccion WHERE id_eleccion = ?', [id], callback);
};

const createEleccion = (eleccion, callback) => {
  const { fecha, tipo, descripcion } = eleccion;
  const sql = 'INSERT INTO eleccion (fecha, tipo, descripcion) VALUES (?, ?, ?)';
  db.query(sql, [fecha, tipo, descripcion], callback);
};

const updateEleccion = (id, eleccion, callback) => {
  const { fecha, tipo, descripcion } = eleccion;
  const sql = 'UPDATE eleccion SET fecha = ?, tipo = ?, descripcion = ? WHERE id_eleccion = ?';
  db.query(sql, [fecha, tipo, descripcion, id], callback);
};

const deleteEleccion = (id, callback) => {
  db.query('DELETE FROM eleccion WHERE id_eleccion = ?', [id], callback);
};

module.exports = {
  getAllElecciones,
  getEleccionById,
  createEleccion,
  updateEleccion,
  deleteEleccion
};

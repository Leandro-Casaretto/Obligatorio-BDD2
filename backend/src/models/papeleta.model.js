const db = require('../db');

const getAllPapeletas = (callback) => {
  const sql = `
    SELECT papeleta\.*, eleccion\.descripcion AS descripcion_eleccion
    FROM papeleta
    JOIN eleccion ON papeleta\.id_eleccion = eleccion\.id_eleccion
  `;
  db.query(sql, callback);
};

const getPapeletaById = (id, callback) => {
  const sql = `
    SELECT papeleta\.*, eleccion\.descripcion AS descripcion_eleccion
    FROM papeleta
    JOIN eleccion ON papeleta\.id_eleccion = eleccion\.id_eleccion
    WHERE papeleta\.id_papeleta = ?
  `;
  db.query(sql, [id], callback);
};

const createPapeleta = (papeleta, callback) => {
  const sql = 'INSERT INTO papeleta (descripcion, color, id_eleccion) VALUES (?, ?, ?)';
  db.query(sql, [papeleta.descripcion, papeleta.color, papeleta.id_eleccion], callback);
};

const updatePapeleta = (id, papeleta, callback) => {
  const sql = 'UPDATE papeleta SET descripcion = ?, color = ?, id_eleccion = ? WHERE id_papeleta = ?';
  db.query(sql, [papeleta.descripcion, papeleta.color, papeleta.id_eleccion, id], callback);
};

const deletePapeleta = (id, callback) => {
  const sql = 'DELETE FROM papeleta WHERE id_papeleta = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllPapeletas,
  getPapeletaById,
  createPapeleta,
  updatePapeleta,
  deletePapeleta,
};

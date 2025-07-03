const db = require('../db');

const getAllPapeletas = (callback) => {
  const sql = `
    SELECT Papeleta.*, Eleccion.descripcion AS descripcion_eleccion
    FROM Papeleta
    JOIN Eleccion ON Papeleta.id_eleccion = Eleccion.id_eleccion
  `;
  db.query(sql, callback);
};

const getPapeletaById = (id, callback) => {
  const sql = `
    SELECT Papeleta.*, Eleccion.descripcion AS descripcion_eleccion
    FROM Papeleta
    JOIN Eleccion ON Papeleta.id_eleccion = Eleccion.id_eleccion
    WHERE Papeleta.id_papeleta = ?
  `;
  db.query(sql, [id], callback);
};

const createPapeleta = (papeleta, callback) => {
  const sql = 'INSERT INTO Papeleta (descripcion, color, id_eleccion) VALUES (?, ?, ?)';
  db.query(sql, [papeleta.descripcion, papeleta.color, papeleta.id_eleccion], callback);
};

const updatePapeleta = (id, papeleta, callback) => {
  const sql = 'UPDATE Papeleta SET descripcion = ?, color = ?, id_eleccion = ? WHERE id_papeleta = ?';
  db.query(sql, [papeleta.descripcion, papeleta.color, papeleta.id_eleccion, id], callback);
};

const deletePapeleta = (id, callback) => {
  const sql = 'DELETE FROM Papeleta WHERE id_papeleta = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllPapeletas,
  getPapeletaById,
  createPapeleta,
  updatePapeleta,
  deletePapeleta,
};

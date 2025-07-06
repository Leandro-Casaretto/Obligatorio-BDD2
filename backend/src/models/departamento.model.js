const db = require('../db');

const getAllDepartamentos = (callback) => {
  const sql = 'SELECT * FROM departamento';
  db.query(sql, callback);
};

const getDepartamentoById = (id, callback) => {
  const sql = 'SELECT * FROM departamento WHERE id_departamento = ?';
  db.query(sql, [id], callback);
};

const createDepartamento = (nombre, callback) => {
  const sql = 'INSERT INTO departamento (nombre) VALUES (?)';
  db.query(sql, [nombre], callback);
};

const updateDepartamento = (id, nombre, callback) => {
  const sql = 'UPDATE departamento SET nombre = ? WHERE id_departamento = ?';
  db.query(sql, [nombre, id], callback);
};

const deleteDepartamento = (id, callback) => {
  const sql = 'DELETE FROM departamento WHERE id_departamento = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};

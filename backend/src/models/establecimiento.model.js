const db = require('../db');

const getAllEstablecimientos = (callback) => {
  const sql = 'SELECT * FROM establecimiento';
  db.query(sql, callback);
};

const getEstablecimientoById = (id, callback) => {
  const sql = 'SELECT * FROM establecimiento WHERE id_establecimiento = ?';
  db.query(sql, [id], callback);
};

const createEstablecimiento = (establecimiento, callback) => {
  const { direccion, tipo, zona, id_departamento } = establecimiento;
  const sql = 'INSERT INTO establecimiento (direccion, tipo, zona, id_departamento) VALUES (?, ?, ?, ?)';
  db.query(sql, [direccion, tipo, zona, id_departamento], callback);
};

const updateEstablecimiento = (id, establecimiento, callback) => {
  const { direccion, tipo, zona, id_departamento } = establecimiento;
  const sql = `
    UPDATE establecimiento 
    SET direccion = ?, tipo = ?, zona = ?, id_departamento = ? 
    WHERE id_establecimiento = ?`;
  db.query(sql, [direccion, tipo, zona, id_departamento, id], callback);
};

const deleteEstablecimiento = (id, callback) => {
  const sql = 'DELETE FROM establecimiento WHERE id_establecimiento = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllEstablecimientos,
  getEstablecimientoById,
  createEstablecimiento,
  updateEstablecimiento,
  deleteEstablecimiento,
};

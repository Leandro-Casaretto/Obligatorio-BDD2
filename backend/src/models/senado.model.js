const db = require('../db');

const getAllSenados = (callback) => {
  const sql = `
    SELECT senado\.*, partido\.nombre AS nombre_partido
    FROM senado
    JOIN partido ON senado\.id_partido = partido\.id_partido
  `;
  db.query(sql, callback);
};

const getSenadoById = (id, callback) => {
  const sql = `
    SELECT senado\.*, partido\.nombre AS nombre_partido
    FROM senado
    JOIN partido ON senado\.id_partido = partido\.id_partido
    WHERE id_senado = ?
  `;
  db.query(sql, [id], callback);
};

const createSenado = (senado, callback) => {
  const sql = 'INSERT INTO senado (nombre, id_partido) VALUES (?, ?)';
  db.query(sql, [senado.nombre, senado.id_partido], callback);
};

const updateSenado = (id, senado, callback) => {
  const sql = 'UPDATE senado SET nombre = ?, id_partido = ? WHERE id_senado = ?';
  db.query(sql, [senado.nombre, senado.id_partido, id], callback);
};

const deleteSenado = (id, callback) => {
  const sql = 'DELETE FROM senado WHERE id_senado = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllSenados,
  getSenadoById,
  createSenado,
  updateSenado,
  deleteSenado
};

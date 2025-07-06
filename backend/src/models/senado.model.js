const db = require('../db');

const getAllSenados = (callback) => {
  const sql = `
    SELECT Senado.*, Partido.nombre AS nombre_partido
    FROM Senado
    JOIN Partido ON Senado.id_partido = Partido.id_partido
  `;
  db.query(sql, callback);
};

const getSenadoById = (id, callback) => {
  const sql = `
    SELECT Senado.*, Partido.nombre AS nombre_partido
    FROM Senado
    JOIN Partido ON Senado.id_partido = Partido.id_partido
    WHERE id_senado = ?
  `;
  db.query(sql, [id], callback);
};

const createSenado = (senado, callback) => {
  const sql = 'INSERT INTO Senado (nombre, id_partido) VALUES (?, ?)';
  db.query(sql, [senado.nombre, senado.id_partido], callback);
};

const updateSenado = (id, senado, callback) => {
  const sql = 'UPDATE Senado SET nombre = ?, id_partido = ? WHERE id_senado = ?';
  db.query(sql, [senado.nombre, senado.id_partido, id], callback);
};

const deleteSenado = (id, callback) => {
  const sql = 'DELETE FROM Senado WHERE id_senado = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllSenados,
  getSenadoById,
  createSenado,
  updateSenado,
  deleteSenado
};

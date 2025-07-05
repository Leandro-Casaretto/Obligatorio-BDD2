const db = require('../db');

const getAllMesas = (callback) => {
  const sql = 'SELECT * FROM Mesa';
  db.query(sql, callback);
};

const getMesaById = (id, callback) => {
  const sql = 'SELECT * FROM Mesa WHERE id_mesa = ?';
  db.query(sql, [id], callback);
};

const createMesa = (mesaData, callback) => {
  const { numero_mesa, estado, id_circuito } = mesaData;
  const sql = 'INSERT INTO Mesa (numero_mesa, estado, id_circuito) VALUES (?, ?, ?)';
  db.query(sql, [numero_mesa, estado, id_circuito], callback);
};

const updateMesa = (id, mesaData, callback) => {
  const { numero_mesa, estado, id_circuito } = mesaData;
  const sql = 'UPDATE Mesa SET numero_mesa = ?, estado = ?, id_circuito = ? WHERE id_mesa = ?';
  db.query(sql, [numero_mesa, estado, id_circuito, id], callback);
};

const deleteMesa = (id, callback) => {
  const sql = 'DELETE FROM Mesa WHERE id_mesa = ?';
  db.query(sql, [id], callback);
};

const cerrarMesa = (id, callback) => {
  const sql = 'UPDATE Mesa SET estado = ? WHERE id_mesa = ?';
  db.query(sql, ['cerrada', id], callback);
};

module.exports = {
  getAllMesas,
  getMesaById,
  createMesa,
  updateMesa,
  deleteMesa,
  cerrarMesa
};

const db = require('../db');

const getAllCircuitos = (callback) => {
  const sql = 'SELECT * FROM circuito';
  db.query(sql, callback);
};

const getCircuitoById = (id, callback) => {
  const sql = 'SELECT * FROM circuito WHERE id_circuito = ?';
  db.query(sql, [id], callback);
};

const createCircuito = (circuito, callback) => {
  const sql = `
    INSERT INTO circuito (numero_circuito, es_accesible, municipio, id_establecimiento, id_eleccion)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    circuito.numero_circuito,
    circuito.es_accesible,
    circuito.municipio,
    circuito.id_establecimiento,
    circuito.id_eleccion
  ];
  db.query(sql, values, callback);
};

const updateCircuito = (id, circuito, callback) => {
  const sql = `
    UPDATE circuito
    SET numero_circuito = ?, es_accesible = ?, municipio = ?, id_establecimiento = ?, id_eleccion = ?
    WHERE id_circuito = ?
  `;
  const values = [
    circuito.numero_circuito,
    circuito.es_accesible,
    circuito.municipio,
    circuito.id_establecimiento,
    circuito.id_eleccion,
    id
  ];
  db.query(sql, values, callback);
};

const deleteCircuito = (id, callback) => {
  const sql = 'DELETE FROM circuito WHERE id_circuito = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllCircuitos,
  getCircuitoById,
  createCircuito,
  updateCircuito,
  deleteCircuito
};

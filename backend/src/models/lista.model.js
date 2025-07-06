const db = require('../db');

const getAllListas = (callback) => {
  const sql = `
    SELECT l.*, e.tipo AS tipo_eleccion, d.nombre AS nombre_departamento
    FROM lista l
    JOIN eleccion e ON l.id_eleccion = e.id_eleccion
    JOIN departamento d ON l.id_departamento = d.id_departamento
  `;
  db.query(sql, callback);
};

const getListaById = (id, callback) => {
  const sql = `
    SELECT l.*, e.tipo AS tipo_eleccion, d.nombre AS nombre_departamento
    FROM lista l
    JOIN eleccion e ON l.id_eleccion = e.id_eleccion
    JOIN departamento d ON l.id_departamento = d.id_departamento
    WHERE l.id_lista = ?
  `;
  db.query(sql, [id], callback);
};

const createLista = (data, callback) => {
  const sql = 'INSERT INTO lista (numero_lista, id_eleccion, id_departamento) VALUES (?, ?, ?)';
  db.query(sql, [data.numero_lista, data.id_eleccion, data.id_departamento], callback);
};

const updateLista = (id, data, callback) => {
  const sql = 'UPDATE lista SET numero_lista = ?, id_eleccion = ?, id_departamento = ? WHERE id_lista = ?';
  db.query(sql, [data.numero_lista, data.id_eleccion, data.id_departamento, id], callback);
};

const deleteLista = (id, callback) => {
  const sql = 'DELETE FROM lista WHERE id_lista = ?';
  db.query(sql, [id], callback);
};

const getListasPorCircuitoYEleccion = (id_circuito, id_eleccion, callback) => {
  const sql = `
    SELECT l.id_lista, l.numero_lista, p.nombre AS partido
    FROM lista l
    JOIN lista_apoya la ON l.id_lista = la.id_lista
    JOIN partido p ON la.id_partido = p.id_partido
    WHERE l.id_departamento = (
      SELECT e.id_departamento
      FROM circuito c
      JOIN establecimiento e ON c.id_establecimiento = e.id_establecimiento
      WHERE c.id_circuito = ?
    )
    AND l.id_eleccion = ?
  `;
  db.query(sql, [id_circuito, id_eleccion], callback);
};

module.exports = {
  getAllListas,
  getListaById,
  createLista,
  updateLista,
  deleteLista,
  getListasPorCircuitoYEleccion
};

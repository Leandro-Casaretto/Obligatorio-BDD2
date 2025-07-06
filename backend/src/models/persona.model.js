const db = require('../db');

const getAllPersonas = (callback) => {
  const sql = 'SELECT * FROM persona';
  db.query(sql, callback);
};

const getPersonaByCI = (ci, callback) => {
  const sql = 'SELECT * FROM persona WHERE ci = ?';
  db.query(sql, [ci], callback);
};

const insertarPersona = (persona, callback) => {
  const { ci, cc, nombre, apellido } = persona;
  const sql = 'INSERT INTO persona (ci, cc, nombre, apellido) VALUES (?, ?, ?, ?)';
  db.query(sql, [ci, cc, nombre, apellido], callback);
};

const actualizarPersona = (ci, persona, callback) => {
  const { cc, nombre, apellido } = persona;
  const sql = 'UPDATE persona SET cc = ?, nombre = ?, apellido = ? WHERE ci = ?';
  db.query(sql, [cc, nombre, apellido, ci], callback);
};

const eliminarPersona = (ci, callback) => {
  const sql = `
    DELETE FROM miembromesa WHERE ci = ?;
    DELETE FROM agentepolicial WHERE ci = ?;
    DELETE FROM candidato WHERE ci = ?;
    DELETE FROM persona WHERE ci = ?;
  `;
  db.query(sql, [ci, ci, ci, ci], callback);
};


module.exports = { getAllPersonas, getPersonaByCI, insertarPersona, actualizarPersona, eliminarPersona };

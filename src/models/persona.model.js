const db = require('../db');

const getAllPersonas = (callback) => {
  const sql = 'SELECT * FROM Persona';
  db.query(sql, callback);
};

const getPersonaByCI = (ci, callback) => {
  const sql = 'SELECT * FROM Persona WHERE ci = ?';
  db.query(sql, [ci], callback);
};

const insertarPersona = (persona, callback) => {
  const { ci, cc, nombre, apellido } = persona;
  const sql = 'INSERT INTO Persona (ci, cc, nombre, apellido) VALUES (?, ?, ?, ?)';
  db.query(sql, [ci, cc, nombre, apellido], callback);
};

const actualizarPersona = (ci, persona, callback) => {
  const { cc, nombre, apellido } = persona;
  const sql = 'UPDATE Persona SET cc = ?, nombre = ?, apellido = ? WHERE ci = ?';
  db.query(sql, [cc, nombre, apellido, ci], callback);
};

const eliminarPersona = (ci, callback) => {
  const sql = `
    DELETE FROM MiembroMesa WHERE ci = ?;
    DELETE FROM AgentePolicial WHERE ci = ?;
    DELETE FROM Candidato WHERE ci = ?;
    DELETE FROM Persona WHERE ci = ?;
  `;
  db.query(sql, [ci, ci, ci, ci], callback);
};


module.exports = { getAllPersonas, getPersonaByCI, insertarPersona, actualizarPersona, eliminarPersona };

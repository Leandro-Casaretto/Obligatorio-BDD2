const db = require('../db');

const getAllCandidatos = (callback) => {
  const sql = `
    SELECT candidato\.ci, persona\.nombre, persona\.apellido
    FROM candidato
    JOIN persona ON candidato\.ci = persona\.ci
  `;
  db.query(sql, callback);
};

const getCandidatoByCI = (ci, callback) => {
  const sql = `
    SELECT candidato\.ci, persona\.nombre, persona\.apellido
    FROM candidato
    JOIN persona ON candidato\.ci = persona\.ci
    WHERE candidato\.ci = ?
  `;
  db.query(sql, [ci], callback);
};

const createCandidato = (ci, callback) => {
  const sql = 'INSERT INTO candidato (ci) VALUES (?)';
  db.query(sql, [ci], callback);
};

const deleteCandidato = (ci, callback) => {
  const sql = 'DELETE FROM candidato WHERE ci = ?';
  db.query(sql, [ci], callback);
};

module.exports = {
  getAllCandidatos,
  getCandidatoByCI,
  createCandidato,
  deleteCandidato,
};

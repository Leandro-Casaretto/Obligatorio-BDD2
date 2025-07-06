const db = require('../db');

const getAllCandidatos = (callback) => {
  const sql = `
    SELECT Candidato.ci, Persona.nombre, Persona.apellido
    FROM Candidato
    JOIN Persona ON Candidato.ci = Persona.ci
  `;
  db.query(sql, callback);
};

const getCandidatoByCI = (ci, callback) => {
  const sql = `
    SELECT Candidato.ci, Persona.nombre, Persona.apellido
    FROM Candidato
    JOIN Persona ON Candidato.ci = Persona.ci
    WHERE Candidato.ci = ?
  `;
  db.query(sql, [ci], callback);
};

const createCandidato = (ci, callback) => {
  const sql = 'INSERT INTO Candidato (ci) VALUES (?)';
  db.query(sql, [ci], callback);
};

const deleteCandidato = (ci, callback) => {
  const sql = 'DELETE FROM Candidato WHERE ci = ?';
  db.query(sql, [ci], callback);
};

module.exports = {
  getAllCandidatos,
  getCandidatoByCI,
  createCandidato,
  deleteCandidato,
};

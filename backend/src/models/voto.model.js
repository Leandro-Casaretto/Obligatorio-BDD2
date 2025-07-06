const db = require('../db');

const createVoto = (voto, callback) => {
  const sql = `
    INSERT INTO Voto (estado, es_observado, id_circuito, id_eleccion)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [voto.estado, voto.es_observado, voto.id_circuito, voto.id_eleccion], callback);
};

const getAllVotos = (callback) => {
  const sql = `
    SELECT * FROM Voto
  `;
  db.query(sql, callback);
};

const getVotoById = (id, callback) => {
  const sql = `
    SELECT * FROM Voto WHERE id_voto = ?
  `;
  db.query(sql, [id], callback);
};

module.exports = {
  createVoto,
  getAllVotos,
  getVotoById
};

const db = require('../db');

const crearRegistroVotoPersona = (datos, callback) => {
  const { ci, id_circuito, id_eleccion, fecha, es_observado } = datos;
  const sql = `
    INSERT INTO Persona_Vota (ci, id_circuito, id_eleccion, fecha, es_observado)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [ci, id_circuito, id_eleccion, fecha, es_observado], callback);
};

const getTodosLosRegistros = (callback) => {
  const sql = `
    SELECT * FROM Persona_Vota
  `;
  db.query(sql, callback);
};

const getVotosPorCI = (ci, callback) => {
  const sql = `
    SELECT * FROM Persona_Vota WHERE ci = ?
  `;
  db.query(sql, [ci], callback);
};

const getVotosPorEleccion = (id_eleccion, callback) => {
  const sql = `
    SELECT * FROM Persona_Vota WHERE id_eleccion = ?
  `;
  db.query(sql, [id_eleccion], callback);
};

const verificarSiYaVoto = (ci, id_eleccion, callback) => {
  const sql = `
    SELECT * FROM Persona_Vota
    WHERE ci = ? AND id_eleccion = ?
  `;
  db.query(sql, [ci, id_eleccion], callback);
};


module.exports = {
  crearRegistroVotoPersona,
  getTodosLosRegistros,
  getVotosPorCI,
  getVotosPorEleccion,
  verificarSiYaVoto
};

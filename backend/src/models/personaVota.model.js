const db = require('../db');

const obtenerCircuitoAsignado = (ci, id_eleccion, callback) => {
  const sql = `
    SELECT id_circuito 
    FROM persona_vota 
    WHERE ci = ? AND id_eleccion = ?
  `;
  db.query(sql, [ci, id_eleccion], callback);
};

const obtenerNumeroCircuitoAsignado = (ci, id_eleccion, callback) => {
  const sql = `
    SELECT c.numero_circuito
    FROM persona_vota pv
    JOIN circuito c ON pv.id_circuito = c.id_circuito
    WHERE pv.ci = ? AND pv.id_eleccion = ?
    LIMIT 1
  `;
  db.query(sql, [ci, id_eleccion], callback);
};

const crearRegistroVotoPersona = (datos, callback) => {
  const { ci, id_circuito, id_eleccion, fecha, es_observado } = datos;
  const sql = `
    INSERT INTO persona_vota (ci, id_circuito, id_eleccion, fecha, es_observado)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [ci, id_circuito, id_eleccion, fecha, es_observado], callback);
};

const actualizarRegistroVotoPersona = (datos, callback) => {
  const { ci, id_eleccion, fecha, es_observado } = datos;
  const sql = `
    UPDATE persona_vota
    SET fecha = ?, es_observado = ?
    WHERE ci = ? AND id_eleccion = ?
  `;
  db.query(sql, [fecha, es_observado, ci, id_eleccion], callback);
};

const getTodosLosRegistros = (callback) => {
  const sql = `
    SELECT * FROM persona_vota
  `;
  db.query(sql, callback);
};

const getVotosPorCI = (ci, callback) => {
  const sql = `
    SELECT * FROM persona_vota WHERE ci = ?
  `;
  db.query(sql, [ci], callback);
};

const getVotosPorEleccion = (id_eleccion, callback) => {
  const sql = `
    SELECT * FROM persona_vota WHERE id_eleccion = ?
  `;
  db.query(sql, [id_eleccion], callback);
};

const verificarSiYaVoto = (ci, id_eleccion, callback) => {
  const sql = `
    SELECT * FROM persona_vota
    WHERE ci = ? AND id_eleccion = ?
  `;
  db.query(sql, [ci, id_eleccion], callback);
};


module.exports = {
  crearRegistroVotoPersona,
  actualizarRegistroVotoPersona,
  getTodosLosRegistros,
  getVotosPorCI,
  getVotosPorEleccion,
  verificarSiYaVoto,
  obtenerCircuitoAsignado,
  obtenerNumeroCircuitoAsignado
};

const db = require('../db');

const getAllAgentesPoliciales = (callback) => {
  const sql = `
    SELECT AgentePolicial.*, Persona.nombre, Persona.apellido
    FROM AgentePolicial
    JOIN Persona ON AgentePolicial.ci = Persona.ci
  `;
  db.query(sql, callback);
};

const getAgentePolicialByCI = (ci, callback) => {
  const sql = `
    SELECT AgentePolicial.*, Persona.nombre, Persona.apellido
    FROM AgentePolicial
    JOIN Persona ON AgentePolicial.ci = Persona.ci
    WHERE AgentePolicial.ci = ?
  `;
  db.query(sql, [ci], callback);
};

const crearAgentePolicial = (agente, callback) => {
  const sql = `
    INSERT INTO AgentePolicial (ci, comisaria, id_establecimiento)
    VALUES (?, ?, ?)
  `;
  const { ci, comisaria, id_establecimiento } = agente;
  db.query(sql, [ci, comisaria, id_establecimiento], callback);
};

const eliminarAgentePolicial = (ci, callback) => {
  const sql = `DELETE FROM AgentePolicial WHERE ci = ?`;
  db.query(sql, [ci], callback);
};

module.exports = {
  getAllAgentesPoliciales,
  getAgentePolicialByCI,
  crearAgentePolicial,
  eliminarAgentePolicial,
};

const db = require('../db');

const getAllAgentesPoliciales = (callback) => {
  const sql = `
    SELECT agentepolicial\.*, persona\.nombre, persona\.apellido
    FROM agentepolicial
    JOIN persona ON agentepolicial\.ci = persona\.ci
  `;
  db.query(sql, callback);
};

const getAgentePolicialByCI = (ci, callback) => {
  const sql = `
    SELECT agentepolicial\.*, persona\.nombre, persona\.apellido
    FROM agentepolicial
    JOIN persona ON agentepolicial\.ci = persona\.ci
    WHERE agentepolicial\.ci = ?
  `;
  db.query(sql, [ci], callback);
};

const crearAgentePolicial = (agente, callback) => {
  const sql = `
    INSERT INTO agentepolicial (ci, comisaria, id_establecimiento)
    VALUES (?, ?, ?)
  `;
  const { ci, comisaria, id_establecimiento } = agente;
  db.query(sql, [ci, comisaria, id_establecimiento], callback);
};

const eliminarAgentePolicial = (ci, callback) => {
  const sql = `DELETE FROM agentepolicial WHERE ci = ?`;
  db.query(sql, [ci], callback);
};

module.exports = {
  getAllAgentesPoliciales,
  getAgentePolicialByCI,
  crearAgentePolicial,
  eliminarAgentePolicial,
};

const db = require('../db');

const getAllMiembrosMesa = (callback) => {
  const sql = `
    SELECT mm.*, p.nombre, p.apellido
    FROM MiembroMesa mm
    JOIN Persona p ON mm.ci = p.ci
  `;
  db.query(sql, callback);
};

const getMiembroMesaByCI = (ci, callback) => {
  const sql = `
    SELECT mm.*, p.nombre, p.apellido
    FROM MiembroMesa mm
    JOIN Persona p ON mm.ci = p.ci
    WHERE mm.ci = ?
  `;
  db.query(sql, [ci], callback);
};

const createMiembroMesa = (miembroMesa, callback) => {
  const sql = 'INSERT INTO MiembroMesa SET ?';
  db.query(sql, miembroMesa, callback);
};

const deleteMiembroMesa = (ci, callback) => {
  const sql = 'DELETE FROM MiembroMesa WHERE ci = ?';
  db.query(sql, [ci], callback);
};

// Busca si el CI es presidente de alguna mesa y devuelve la info de la mesa
const getMesaPorPresidente = (ci, callback) => {
  const sql = `
    SELECT m.id_mesa, m.id_circuito, mm.ci, mm.rol,
           c.id_establecimiento, e.id_departamento
    FROM MiembroMesa mm
    JOIN Mesa m ON mm.id_mesa = m.id_mesa
    JOIN Circuito c ON m.id_circuito = c.id_circuito
    JOIN Establecimiento e ON c.id_establecimiento = e.id_establecimiento
    WHERE mm.ci = ? AND mm.rol = 'presidente'
    LIMIT 1
  `;
  db.query(sql, [ci], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

module.exports = {
  getAllMiembrosMesa,
  getMiembroMesaByCI,
  createMiembroMesa,
  deleteMiembroMesa,
  getMesaPorPresidente,
};

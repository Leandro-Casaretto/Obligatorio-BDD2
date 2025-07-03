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

module.exports = {
  getAllMiembrosMesa,
  getMiembroMesaByCI,
  createMiembroMesa,
  deleteMiembroMesa
};

const db = require('../db');

const getAllFormulas = (callback) => {
  const sql = `
    SELECT f.id_formula, f.ci_presidente, f.ci_vicepresidente, f.id_partido,
           p1.nombre AS nombre_presidente, p1.apellido AS apellido_presidente,
           p2.nombre AS nombre_vicepresidente, p2.apellido AS apellido_vicepresidente,
           pa.nombre AS nombre_partido
    FROM formulapresidencial f
    JOIN persona p1 ON f.ci_presidente = p1.ci
    JOIN persona p2 ON f.ci_vicepresidente = p2.ci
    JOIN partido pa ON f.id_partido = pa.id_partido
  `;
  db.query(sql, callback);
};

const getFormulaById = (id, callback) => {
  const sql = `
    SELECT f.id_formula, f.ci_presidente, f.ci_vicepresidente, f.id_partido,
           p1.nombre AS nombre_presidente, p1.apellido AS apellido_presidente,
           p2.nombre AS nombre_vicepresidente, p2.apellido AS apellido_vicepresidente,
           pa.nombre AS nombre_partido
    FROM formulapresidencial f
    JOIN persona p1 ON f.ci_presidente = p1.ci
    JOIN persona p2 ON f.ci_vicepresidente = p2.ci
    JOIN partido pa ON f.id_partido = pa.id_partido
    WHERE f.id_formula = ?
  `;
  db.query(sql, [id], callback);
};

const createFormula = (formula, callback) => {
  const sql = `
    INSERT INTO formulapresidencial (ci_presidente, ci_vicepresidente, id_partido)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [formula.ci_presidente, formula.ci_vicepresidente, formula.id_partido], callback);
};

const deleteFormula = (id, callback) => {
  const sql = 'DELETE FROM formulapresidencial WHERE id_formula = ?';
  db.query(sql, [id], callback);
};

module.exports = { getAllFormulas, getFormulaById, createFormula, deleteFormula };

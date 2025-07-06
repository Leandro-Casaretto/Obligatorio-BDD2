const db = require('../db');

const crearVotoPapeleta = (id_voto, id_papeleta, callback) => {
  const sql = 'INSERT INTO voto_papeleta (id_voto, id_papeleta) VALUES (?, ?)';
  db.query(sql, [id_voto, id_papeleta], callback);
};

const obtenerVotoPapeleta = (callback) => {
  const sql = `
    SELECT vp.id_voto, vp.id_papeleta, p.descripcion, p.color
    FROM voto_papeleta vp
    JOIN papeleta p ON vp.id_papeleta = p.id_papeleta
  `;
  db.query(sql, callback);
};

module.exports = {
  crearVotoPapeleta,
  obtenerVotoPapeleta
};

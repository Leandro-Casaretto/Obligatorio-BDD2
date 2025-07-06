const db = require('../db');

const crearVotoPapeleta = (id_voto, id_papeleta, callback) => {
  const sql = 'INSERT INTO Voto_Papeleta (id_voto, id_papeleta) VALUES (?, ?)';
  db.query(sql, [id_voto, id_papeleta], callback);
};

const obtenerVotoPapeleta = (callback) => {
  const sql = `
    SELECT vp.id_voto, vp.id_papeleta, p.descripcion, p.color
    FROM Voto_Papeleta vp
    JOIN Papeleta p ON vp.id_papeleta = p.id_papeleta
  `;
  db.query(sql, callback);
};

module.exports = {
  crearVotoPapeleta,
  obtenerVotoPapeleta
};

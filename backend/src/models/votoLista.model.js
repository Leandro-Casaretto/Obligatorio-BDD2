const db = require('../db');

const crearVotoLista = (id_voto, id_lista, callback) => {
  const sql = 'INSERT INTO voto_lista (id_voto, id_lista) VALUES (?, ?)';
  db.query(sql, [id_voto, id_lista], callback);
};

const obtenerVotosLista = (callback) => {
  const sql = `
    SELECT vl.*, v.estado, l.numero_lista
    FROM voto_lista vl
    JOIN voto v ON vl.id_voto = v.id_voto
    JOIN lista l ON vl.id_lista = l.id_lista
  `;
  db.query(sql, callback);
};

module.exports = {
  crearVotoLista,
  obtenerVotosLista,
};

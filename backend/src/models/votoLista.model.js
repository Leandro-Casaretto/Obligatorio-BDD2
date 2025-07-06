const db = require('../db');

const crearVotoLista = (id_voto, id_lista, callback) => {
  const sql = 'INSERT INTO Voto_Lista (id_voto, id_lista) VALUES (?, ?)';
  db.query(sql, [id_voto, id_lista], callback);
};

const obtenerVotosLista = (callback) => {
  const sql = `
    SELECT vl.*, v.estado, l.numero_lista
    FROM Voto_Lista vl
    JOIN Voto v ON vl.id_voto = v.id_voto
    JOIN Lista l ON vl.id_lista = l.id_lista
  `;
  db.query(sql, callback);
};

module.exports = {
  crearVotoLista,
  obtenerVotosLista,
};

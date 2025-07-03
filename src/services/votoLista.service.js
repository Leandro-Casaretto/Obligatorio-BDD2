const votoListaModel = require('../models/votoLista.model');

const agregarVotoALista = (id_voto, id_lista) => {
  return new Promise((resolve, reject) => {
    votoListaModel.crearVotoLista(id_voto, id_lista, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const listarVotosLista = () => {
  return new Promise((resolve, reject) => {
    votoListaModel.obtenerVotosLista((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  agregarVotoALista,
  listarVotosLista,
};

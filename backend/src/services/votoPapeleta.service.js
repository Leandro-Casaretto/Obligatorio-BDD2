const votoPapeletaModel = require('../models/votoPapeleta.model');

const asociarVotoPapeleta = (id_voto, id_papeleta) => {
  return new Promise((resolve, reject) => {
    votoPapeletaModel.crearVotoPapeleta(id_voto, id_papeleta, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerVotoPapeleta = () => {
  return new Promise((resolve, reject) => {
    votoPapeletaModel.obtenerVotoPapeleta((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  asociarVotoPapeleta,
  obtenerVotoPapeleta
};

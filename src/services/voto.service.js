const votoModel = require('../models/voto.model');

const crearVoto = (voto) => {
  return new Promise((resolve, reject) => {
    votoModel.createVoto(voto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerTodosLosVotos = () => {
  return new Promise((resolve, reject) => {
    votoModel.getAllVotos((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerVotoPorId = (id) => {
  return new Promise((resolve, reject) => {
    votoModel.getVotoById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

module.exports = {
  crearVoto,
  obtenerTodosLosVotos,
  obtenerVotoPorId
};

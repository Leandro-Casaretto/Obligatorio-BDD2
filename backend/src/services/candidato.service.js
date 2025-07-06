const candidatoModel = require('../models/candidato.model');

const obtenerTodosLosCandidatos = () => {
  return new Promise((resolve, reject) => {
    candidatoModel.getAllCandidatos((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerCandidatoPorCI = (ci) => {
  return new Promise((resolve, reject) => {
    candidatoModel.getCandidatoByCI(ci, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearCandidato = (ci) => {
  return new Promise((resolve, reject) => {
    candidatoModel.createCandidato(ci, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarCandidato = (ci) => {
  return new Promise((resolve, reject) => {
    candidatoModel.deleteCandidato(ci, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodosLosCandidatos,
  obtenerCandidatoPorCI,
  crearCandidato,
  eliminarCandidato,
};

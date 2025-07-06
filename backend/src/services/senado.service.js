const senadoModel = require('../models/senado.model');

const obtenerTodosLosSenados = () => {
  return new Promise((resolve, reject) => {
    senadoModel.getAllSenados((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerSenadoPorId = (id) => {
  return new Promise((resolve, reject) => {
    senadoModel.getSenadoById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearSenado = (senado) => {
  return new Promise((resolve, reject) => {
    senadoModel.createSenado(senado, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarSenado = (id, senado) => {
  return new Promise((resolve, reject) => {
    senadoModel.updateSenado(id, senado, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarSenado = (id) => {
  return new Promise((resolve, reject) => {
    senadoModel.deleteSenado(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodosLosSenados,
  obtenerSenadoPorId,
  crearSenado,
  actualizarSenado,
  eliminarSenado
};

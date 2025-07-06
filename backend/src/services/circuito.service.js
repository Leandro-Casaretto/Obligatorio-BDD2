const circuitoModel = require('../models/circuito.model');

const obtenerTodosLosCircuitos = () => {
  return new Promise((resolve, reject) => {
    circuitoModel.getAllCircuitos((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerCircuitoPorId = (id) => {
  return new Promise((resolve, reject) => {
    circuitoModel.getCircuitoById(id, (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) return resolve(null);
      resolve(result[0]);
    });
  });
};

const crearCircuito = (data) => {
  return new Promise((resolve, reject) => {
    circuitoModel.createCircuito(data, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

const actualizarCircuito = (id, data) => {
  return new Promise((resolve, reject) => {
    circuitoModel.updateCircuito(id, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarCircuito = (id) => {
  return new Promise((resolve, reject) => {
    circuitoModel.deleteCircuito(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodosLosCircuitos,
  obtenerCircuitoPorId,
  crearCircuito,
  actualizarCircuito,
  eliminarCircuito
};

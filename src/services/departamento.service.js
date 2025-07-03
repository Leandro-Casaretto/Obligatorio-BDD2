const departamentoModel = require('../models/departamento.model');

const obtenerTodosLosDepartamentos = () => {
  return new Promise((resolve, reject) => {
    departamentoModel.getAllDepartamentos((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerDepartamentoPorId = (id) => {
  return new Promise((resolve, reject) => {
    departamentoModel.getDepartamentoById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearDepartamento = (nombre) => {
  return new Promise((resolve, reject) => {
    departamentoModel.createDepartamento(nombre, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDepartamento = (id, nombre) => {
  return new Promise((resolve, reject) => {
    departamentoModel.updateDepartamento(id, nombre, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarDepartamento = (id) => {
  return new Promise((resolve, reject) => {
    departamentoModel.deleteDepartamento(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodosLosDepartamentos,
  obtenerDepartamentoPorId,
  crearDepartamento,
  actualizarDepartamento,
  eliminarDepartamento,
};

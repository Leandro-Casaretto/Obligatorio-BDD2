const eleccionModel = require('../models/eleccion.model');

const obtenerTodasLasElecciones = () => {
  return new Promise((resolve, reject) => {
    eleccionModel.getAllElecciones((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerEleccionPorId = (id) => {
  return new Promise((resolve, reject) => {
    eleccionModel.getEleccionById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearEleccion = (eleccion) => {
  return new Promise((resolve, reject) => {
    eleccionModel.createEleccion(eleccion, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

const actualizarEleccion = (id, eleccion) => {
  return new Promise((resolve, reject) => {
    eleccionModel.updateEleccion(id, eleccion, (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

const eliminarEleccion = (id) => {
  return new Promise((resolve, reject) => {
    eleccionModel.deleteEleccion(id, (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  obtenerTodasLasElecciones,
  obtenerEleccionPorId,
  crearEleccion,
  actualizarEleccion,
  eliminarEleccion
};

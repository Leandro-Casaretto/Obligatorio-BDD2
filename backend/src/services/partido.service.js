const partidoModel = require('../models/partido.model');

const obtenerTodosLosPartidos = () => {
  return new Promise((resolve, reject) => {
    partidoModel.getAllPartidos((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerPartidoPorId = (id) => {
  return new Promise((resolve, reject) => {
    partidoModel.getPartidoById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearPartido = (partido) => {
  return new Promise((resolve, reject) => {
    partidoModel.createPartido(partido, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarPartido = (id, partido) => {
  return new Promise((resolve, reject) => {
    partidoModel.updatePartido(id, partido, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarPartido = (id) => {
  return new Promise((resolve, reject) => {
    partidoModel.deletePartido(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodosLosPartidos,
  obtenerPartidoPorId,
  crearPartido,
  actualizarPartido,
  eliminarPartido,
};

const model = require('../models/listaApoya.model');

const crearRelacion = (data) => {
  return new Promise((resolve, reject) => {
    model.crearRelacion(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getTodas = () => {
  return new Promise((resolve, reject) => {
    model.getTodas((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  crearRelacion,
  getTodas
};

const papeletaModel = require('../models/papeleta.model');

const obtenerTodas = () => {
  return new Promise((resolve, reject) => {
    papeletaModel.getAllPapeletas((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerPorId = (id) => {
  return new Promise((resolve, reject) => {
    papeletaModel.getPapeletaById(id, (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const crear = (data) => {
  return new Promise((resolve, reject) => {
    papeletaModel.createPapeleta(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizar = (id, data) => {
  return new Promise((resolve, reject) => {
    papeletaModel.updatePapeleta(id, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminar = (id) => {
  return new Promise((resolve, reject) => {
    papeletaModel.deletePapeleta(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };

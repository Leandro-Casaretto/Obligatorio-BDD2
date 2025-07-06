const miembroMesaModel = require('../models/miembroMesa.model');

const obtenerTodos = () => {
  return new Promise((resolve, reject) => {
    miembroMesaModel.getAllMiembrosMesa((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorCI = (ci) => {
  return new Promise((resolve, reject) => {
    miembroMesaModel.getMiembroMesaByCI(ci, (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) return resolve(null);
      resolve(result[0]);
    });
  });
};

const crear = (data) => {
  return new Promise((resolve, reject) => {
    miembroMesaModel.createMiembroMesa(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminar = (ci) => {
  return new Promise((resolve, reject) => {
    miembroMesaModel.deleteMiembroMesa(ci, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodos,
  obtenerPorCI,
  crear,
  eliminar
};

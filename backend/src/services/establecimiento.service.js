const establecimientoModel = require('../models/establecimiento.model');

const obtenerTodos = () => {
  return new Promise((resolve, reject) => {
    establecimientoModel.getAllEstablecimientos((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerPorId = (id) => {
  return new Promise((resolve, reject) => {
    establecimientoModel.getEstablecimientoById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crear = (datos) => {
  return new Promise((resolve, reject) => {
    establecimientoModel.createEstablecimiento(datos, (err, result) => {
      if (err) return reject(err);
      resolve({ id_establecimiento: result.insertId, ...datos });
    });
  });
};

const actualizar = (id, datos) => {
  return new Promise((resolve, reject) => {
    establecimientoModel.updateEstablecimiento(id, datos, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminar = (id) => {
  return new Promise((resolve, reject) => {
    establecimientoModel.deleteEstablecimiento(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};

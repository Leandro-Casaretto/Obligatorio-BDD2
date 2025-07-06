const mesaModel = require('../models/mesa.model');

const obtenerTodasLasMesas = () => {
  return new Promise((resolve, reject) => {
    mesaModel.getAllMesas((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerMesaPorId = (id) => {
  return new Promise((resolve, reject) => {
    mesaModel.getMesaById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearMesa = (mesaData) => {
  return new Promise((resolve, reject) => {
    mesaModel.createMesa(mesaData, (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...mesaData });
    });
  });
};

const actualizarMesa = (id, mesaData) => {
  return new Promise((resolve, reject) => {
    mesaModel.updateMesa(id, mesaData, (err) => {
      if (err) return reject(err);
      resolve({ id, ...mesaData });
    });
  });
};

const eliminarMesa = (id) => {
  return new Promise((resolve, reject) => {
    mesaModel.deleteMesa(id, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const cerrarMesa = (id) => {
  return new Promise((resolve, reject) => {
    mesaModel.cerrarMesa(id, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = {
  obtenerTodasLasMesas,
  obtenerMesaPorId,
  crearMesa,
  actualizarMesa,
  eliminarMesa,
  cerrarMesa
};

const listaModel = require('../models/lista.model');

const obtenerTodasLasListas = () => {
  return new Promise((resolve, reject) => {
    listaModel.getAllListas((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerListaPorId = (id) => {
  return new Promise((resolve, reject) => {
    listaModel.getListaById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearLista = (data) => {
  return new Promise((resolve, reject) => {
    listaModel.createLista(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarLista = (id, data) => {
  return new Promise((resolve, reject) => {
    listaModel.updateLista(id, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarLista = (id) => {
  return new Promise((resolve, reject) => {
    listaModel.deleteLista(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerListasPorCircuitoYEleccion = (id_circuito, id_eleccion) => {
  return new Promise((resolve, reject) => {
    listaModel.getListasPorCircuitoYEleccion(id_circuito, id_eleccion, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

<<<<<<< HEAD

=======
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628
module.exports = {
  obtenerTodasLasListas,
  obtenerListaPorId,
  crearLista,
  actualizarLista,
  eliminarLista,
  obtenerListasPorCircuitoYEleccion
};

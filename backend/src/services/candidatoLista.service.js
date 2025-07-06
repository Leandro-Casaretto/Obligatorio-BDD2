const candidatoListaModel = require('../models/candidatoLista.model');

const crearRelacion = (datos) => {
  return new Promise((resolve, reject) => {
    candidatoListaModel.crearRelacion(datos, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getTodasRelaciones = () => {
  return new Promise((resolve, reject) => {
    candidatoListaModel.getTodasRelaciones((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getRelacionesPorLista = (id_lista) => {
  return new Promise((resolve, reject) => {
    candidatoListaModel.getRelacionesPorLista(id_lista, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { crearRelacion, getTodasRelaciones, getRelacionesPorLista };

const personaVotaModel = require('../models/personaVota.model');

const crearRegistroVotoPersona = (datos) => {
  return new Promise((resolve, reject) => {
    const { ci, id_eleccion } = datos;

    personaVotaModel.verificarSiYaVoto(ci, id_eleccion, (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) {
        return reject(new Error('Esta persona ya ha votado en esta elección.'));
      }

      personaVotaModel.crearRegistroVotoPersona(datos, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

const actualizarRegistroVotoPersona = (datos) => {
  return new Promise((resolve, reject) => {
    personaVotaModel.actualizarRegistroVotoPersona(datos, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getTodosLosRegistros = () => {
  return new Promise((resolve, reject) => {
    personaVotaModel.getTodosLosRegistros((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getVotosPorCI = (ci) => {
  return new Promise((resolve, reject) => {
    personaVotaModel.getVotosPorCI(ci, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getVotosPorEleccion = (id_eleccion) => {
  return new Promise((resolve, reject) => {
    personaVotaModel.getVotosPorEleccion(id_eleccion, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


const obtenerCircuitoAsignado = (ci, id_eleccion) => {
  return new Promise((resolve, reject) => {
    personaVotaModel.obtenerCircuitoAsignado(ci, id_eleccion, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerNumeroCircuitoAsignado = (ci, id_eleccion) => {
  return new Promise((resolve, reject) => {
    personaVotaModel.obtenerNumeroCircuitoAsignado(ci, id_eleccion, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  crearRegistroVotoPersona,
  actualizarRegistroVotoPersona,
  getTodosLosRegistros,
  getVotosPorCI,
  getVotosPorEleccion,
  obtenerCircuitoAsignado,
  obtenerNumeroCircuitoAsignado
};

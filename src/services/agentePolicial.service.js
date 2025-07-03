const agenteModel = require('../models/agentePolicial.model');

const obtenerTodosLosAgentes = () => {
  return new Promise((resolve, reject) => {
    agenteModel.getAllAgentesPoliciales((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerAgentePorCI = (ci) => {
  return new Promise((resolve, reject) => {
    agenteModel.getAgentePolicialByCI(ci, (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) return resolve(null);
      resolve(result[0]);
    });
  });
};

const crearAgente = (agente) => {
  return new Promise((resolve, reject) => {
    agenteModel.crearAgentePolicial(agente, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarAgente = (ci) => {
  return new Promise((resolve, reject) => {
    agenteModel.eliminarAgentePolicial(ci, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodosLosAgentes,
  obtenerAgentePorCI,
  crearAgente,
  eliminarAgente,
};

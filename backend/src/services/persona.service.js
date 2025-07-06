const personaModel = require('../models/persona.model');

const obtenerTodasLasPersonas = () => {
  return new Promise((resolve, reject) => {
    personaModel.getAllPersonas((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerPersonaPorCI = (ci) => {
  return new Promise((resolve, reject) => {
    personaModel.getPersonaByCI(ci, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearPersona = (persona) => {
  return new Promise((resolve, reject) => {
    personaModel.insertarPersona(persona, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarPersona = (ci, persona) => {
  return new Promise((resolve, reject) => {
    personaModel.actualizarPersona(ci, persona, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarPersona = (ci) => {
  return new Promise((resolve, reject) => {
    personaModel.eliminarPersona(ci, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


module.exports = { obtenerTodasLasPersonas, obtenerPersonaPorCI, crearPersona, actualizarPersona, eliminarPersona };

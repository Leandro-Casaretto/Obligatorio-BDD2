const formulaModel = require('../models/formula.model');

const obtenerTodasLasFormulas = () => {
  return new Promise((resolve, reject) => {
    formulaModel.getAllFormulas((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerFormulaPorId = (id) => {
  return new Promise((resolve, reject) => {
    formulaModel.getFormulaById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

const crearFormula = (formula) => {
  return new Promise((resolve, reject) => {
    formulaModel.createFormula(formula, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const eliminarFormula = (id) => {
  return new Promise((resolve, reject) => {
    formulaModel.deleteFormula(id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  obtenerTodasLasFormulas,
  obtenerFormulaPorId,
  crearFormula,
  eliminarFormula,
};

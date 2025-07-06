const formulaService = require('../services/formula.service');

const getAllFormulas = async (req, res) => {
  try {
    const formulas = await formulaService.obtenerTodasLasFormulas();
    res.json(formulas);
  } catch (err) {
    console.error('Error en getAllFormulas:', err);
    res.status(500).json({ error: 'Error al obtener fórmulas' });
  }
};

const getFormulaById = async (req, res) => {
  try {
    const id = req.params.id;
    const formula = await formulaService.obtenerFormulaPorId(id);

    if (!formula) {
      return res.status(404).json({ error: 'Fórmula no encontrada' });
    }

    res.json(formula);
  } catch (err) {
    console.error('Error en getFormulaById:', err);
    res.status(500).json({ error: 'Error al buscar fórmula' });
  }
};

const createFormula = async (req, res) => {
  try {
    const formula = req.body;
    const result = await formulaService.crearFormula(formula);
    res.status(201).json({ mensaje: 'Fórmula creada correctamente' });
  } catch (err) {
    console.error('Error en createFormula:', err);
    res.status(500).json({ error: 'Error al crear fórmula' });
  }
};

const deleteFormula = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await formulaService.eliminarFormula(id);
    res.json({ mensaje: 'Fórmula eliminada correctamente' });
  } catch (err) {
    console.error('Error en deleteFormula:', err);
    res.status(500).json({ error: 'Error al eliminar fórmula' });
  }
};

module.exports = {
  getAllFormulas,
  getFormulaById,
  createFormula,
  deleteFormula,
};

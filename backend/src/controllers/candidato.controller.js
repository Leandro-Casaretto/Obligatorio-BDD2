const candidatoService = require('../services/candidato.service');

const getAllCandidatos = async (req, res) => {
  try {
    const candidatos = await candidatoService.obtenerTodosLosCandidatos();
    res.json(candidatos);
  } catch (err) {
    console.error('🔴 Error al obtener candidatos:', err);
    res.status(500).json({ error: 'Error al obtener candidatos' });
  }
};

const getCandidatoByCI = async (req, res) => {
  try {
    const ci = req.params.ci;
    const candidato = await candidatoService.obtenerCandidatoPorCI(ci);
    if (!candidato) {
      return res.status(404).json({ error: 'candidato no encontrado' });
    }
    res.json(candidato);
  } catch (err) {
    console.error('🔴 Error en getCandidatoByCI:', err);
    res.status(500).json({ error: 'Error al buscar candidato' });
  }
};

const createCandidato = async (req, res) => {
  try {
    const { ci } = req.body;
    if (!ci) return res.status(400).json({ error: 'Debe proporcionar una cédula (ci)' });

    await candidatoService.crearCandidato(ci);
    res.status(201).json({ mensaje: 'candidato creado correctamente' });
  } catch (err) {
    console.error('🔴 Error en createCandidato:', err);
    res.status(500).json({ error: 'Error al crear candidato' });
  }
};

const deleteCandidato = async (req, res) => {
  try {
    const ci = req.params.ci;
    await candidatoService.eliminarCandidato(ci);
    res.json({ mensaje: 'candidato eliminado correctamente' });
  } catch (err) {
    console.error('🔴 Error en deleteCandidato:', err);
    res.status(500).json({ error: 'Error al eliminar candidato' });
  }
};

module.exports = {
  getAllCandidatos,
  getCandidatoByCI,
  createCandidato,
  deleteCandidato,
};

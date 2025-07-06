const senadoService = require('../services/senado.service');

const getAllSenados = async (req, res) => {
  try {
    const senados = await senadoService.obtenerTodosLosSenados();
    res.json(senados);
  } catch (err) {
    console.error('🔴 Error en getAllSenados:', err);
    res.status(500).json({ error: 'Error al obtener senados' });
  }
};

const getSenadoById = async (req, res) => {
  try {
    const id = req.params.id;
    const senado = await senadoService.obtenerSenadoPorId(id);
    if (!senado) return res.status(404).json({ error: 'senado no encontrado' });
    res.json(senado);
  } catch (err) {
    console.error('🔴 Error en getSenadoById:', err);
    res.status(500).json({ error: 'Error al buscar senado' });
  }
};

const createSenado = async (req, res) => {
  try {
    const result = await senadoService.crearSenado(req.body);
    res.status(201).json({ mensaje: 'senado creado correctamente' });
  } catch (err) {
    console.error('🔴 Error en createSenado:', err);
    res.status(500).json({ error: 'Error al crear senado' });
  }
};

const updateSenado = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await senadoService.actualizarSenado(id, req.body);
    res.json({ mensaje: 'senado actualizado correctamente' });
  } catch (err) {
    console.error('🔴 Error en updateSenado:', err);
    res.status(500).json({ error: 'Error al actualizar senado' });
  }
};

const deleteSenado = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await senadoService.eliminarSenado(id);
    res.json({ mensaje: 'senado eliminado correctamente' });
  } catch (err) {
    console.error('🔴 Error en deleteSenado:', err);
    res.status(500).json({ error: 'Error al eliminar senado' });
  }
};

module.exports = {
  getAllSenados,
  getSenadoById,
  createSenado,
  updateSenado,
  deleteSenado
};

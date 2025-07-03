const circuitoService = require('../services/circuito.service');

const getAllCircuitos = async (req, res) => {
  try {
    const circuitos = await circuitoService.obtenerTodosLosCircuitos();
    res.json(circuitos);
  } catch (err) {
    console.error('🔴 Error en getAllCircuitos:', err);
    res.status(500).json({ error: 'Error al obtener circuitos' });
  }
};

const getCircuitoById = async (req, res) => {
  try {
    const id = req.params.id;
    const circuito = await circuitoService.obtenerCircuitoPorId(id);
    if (!circuito) {
      return res.status(404).json({ error: 'Circuito no encontrado' });
    }
    res.json(circuito);
  } catch (err) {
    console.error('🔴 Error en getCircuitoById:', err);
    res.status(500).json({ error: 'Error al buscar circuito' });
  }
};

const createCircuito = async (req, res) => {
  try {
    const nuevoId = await circuitoService.crearCircuito(req.body);
    res.status(201).json({ mensaje: 'Circuito creado correctamente', id: nuevoId });
  } catch (err) {
    console.error('🔴 Error en createCircuito:', err);
    res.status(500).json({ error: 'Error al crear circuito' });
  }
};

const updateCircuito = async (req, res) => {
  try {
    const id = req.params.id;
    await circuitoService.actualizarCircuito(id, req.body);
    res.json({ mensaje: 'Circuito actualizado correctamente' });
  } catch (err) {
    console.error('🔴 Error en updateCircuito:', err);
    res.status(500).json({ error: 'Error al actualizar circuito' });
  }
};

const deleteCircuito = async (req, res) => {
  try {
    const id = req.params.id;
    await circuitoService.eliminarCircuito(id);
    res.json({ mensaje: 'Circuito eliminado correctamente' });
  } catch (err) {
    console.error('🔴 Error en deleteCircuito:', err);
    res.status(500).json({ error: 'Error al eliminar circuito' });
  }
};

module.exports = {
  getAllCircuitos,
  getCircuitoById,
  createCircuito,
  updateCircuito,
  deleteCircuito
};

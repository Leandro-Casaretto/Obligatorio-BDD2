const papeletaService = require('../services/papeleta.service');

const getAll = async (req, res) => {
  try {
    const datos = await papeletaService.obtenerTodas();
    res.json(datos);
  } catch (err) {
    console.error('Error al obtener papeletas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = await papeletaService.obtenerPorId(id);
    if (!datos) return res.status(404).json({ error: 'papeleta no encontrada' });
    res.json(datos);
  } catch (err) {
    console.error('Error al obtener la papeleta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const create = async (req, res) => {
  try {
    const nueva = await papeletaService.crear(req.body);
    res.status(201).json({ mensaje: 'papeleta creada correctamente' });
  } catch (err) {
    console.error('Error al crear papeleta:', err);
    res.status(500).json({ error: 'Error al crear papeleta' });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await papeletaService.actualizar(id, req.body);
    res.json({ mensaje: 'papeleta actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar papeleta:', err);
    res.status(500).json({ error: 'Error al actualizar papeleta' });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await papeletaService.eliminar(id);
    res.json({ mensaje: 'papeleta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar papeleta:', err);
    res.status(500).json({ error: 'Error al eliminar papeleta' });
  }
};

module.exports = { getAll, getById, create, update, remove };

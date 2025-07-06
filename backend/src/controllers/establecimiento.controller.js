const establecimientoService = require('../services/establecimiento.service');

const getAll = async (req, res) => {
  try {
    const datos = await establecimientoService.obtenerTodos();
    res.json(datos);
  } catch (err) {
    console.error('Error en getAll:', err);
    res.status(500).json({ error: 'Error al obtener establecimientos' });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const est = await establecimientoService.obtenerPorId(id);

    if (!est) {
      return res.status(404).json({ error: 'establecimiento no encontrado' });
    }

    res.json(est);
  } catch (err) {
    console.error('Error en getById:', err);
    res.status(500).json({ error: 'Error al buscar establecimiento' });
  }
};

const create = async (req, res) => {
  try {
    const datos = req.body;
    const nuevo = await establecimientoService.crear(datos);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error en create:', err);
    res.status(500).json({ error: 'Error al crear establecimiento' });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;
    await establecimientoService.actualizar(id, datos);
    res.json({ mensaje: 'establecimiento actualizado' });
  } catch (err) {
    console.error('Error en update:', err);
    res.status(500).json({ error: 'Error al actualizar establecimiento' });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await establecimientoService.eliminar(id);
    res.json({ mensaje: 'establecimiento eliminado' });
  } catch (err) {
    console.error('Error en remove:', err);
    res.status(500).json({ error: 'Error al eliminar establecimiento' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

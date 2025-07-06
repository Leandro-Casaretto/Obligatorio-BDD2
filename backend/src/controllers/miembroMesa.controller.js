const service = require('../services/miembroMesa.service');

const getAll = async (req, res) => {
  try {
    const miembros = await service.obtenerTodos();
    res.json(miembros);
  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({ error: 'Error al obtener miembros de mesa' });
  }
};

const getByCI = async (req, res) => {
  try {
    const miembro = await service.obtenerPorCI(req.params.ci);
    if (!miembro) {
      return res.status(404).json({ error: 'Miembro no encontrado' });
    }
    res.json(miembro);
  } catch (error) {
    console.error('Error en getByCI:', error);
    res.status(500).json({ error: 'Error al buscar miembro' });
  }
};

const create = async (req, res) => {
  try {
    const result = await service.crear(req.body);
    res.status(201).json({ mensaje: 'Miembro creado correctamente' });
  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({ error: 'Error al crear miembro de mesa' });
  }
};

const remove = async (req, res) => {
  try {
    await service.eliminar(req.params.ci);
    res.json({ mensaje: 'Miembro eliminado correctamente' });
  } catch (error) {
    console.error('Error en eliminar:', error);
    res.status(500).json({ error: 'Error al eliminar miembro de mesa' });
  }
};

module.exports = { getAll, getByCI, create, remove };

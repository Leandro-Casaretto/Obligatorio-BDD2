const eleccionService = require('../services/eleccion.service');

const getAllElecciones = async (req, res) => {
  try {
    const elecciones = await eleccionService.obtenerTodasLasElecciones();
    res.json(elecciones);
  } catch (err) {
    console.error('Error en getAllElecciones:', err);
    res.status(500).json({ error: 'Error al obtener elecciones' });
  }
};

const getEleccionById = async (req, res) => {
  try {
    const id = req.params.id;
    const eleccion = await eleccionService.obtenerEleccionPorId(id);
    if (!eleccion) {
      return res.status(404).json({ error: 'Elección no encontrada' });
    }
    res.json(eleccion);
  } catch (err) {
    console.error('Error en getEleccionById:', err);
    res.status(500).json({ error: 'Error al buscar elección' });
  }
};

const createEleccion = async (req, res) => {
  try {
    const id = await eleccionService.crearEleccion(req.body);
    res.status(201).json({ message: 'Elección creada', id });
  } catch (err) {
    console.error('Error en createEleccion:', err);
    res.status(500).json({ error: 'Error al crear elección' });
  }
};

const updateEleccion = async (req, res) => {
  try {
    const id = req.params.id;
    const affectedRows = await eleccionService.actualizarEleccion(id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Elección no encontrada' });
    }
    res.json({ message: 'Elección actualizada' });
  } catch (err) {
    console.error('Error en updateEleccion:', err);
    res.status(500).json({ error: 'Error al actualizar elección' });
  }
};

const deleteEleccion = async (req, res) => {
  try {
    const id = req.params.id;
    const affectedRows = await eleccionService.eliminarEleccion(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Elección no encontrada' });
    }
    res.json({ message: 'Elección eliminada' });
  } catch (err) {
    console.error('Error en deleteEleccion:', err);
    res.status(500).json({ error: 'Error al eliminar elección' });
  }
};

module.exports = {
  getAllElecciones,
  getEleccionById,
  createEleccion,
  updateEleccion,
  deleteEleccion
};

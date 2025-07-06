const partidoService = require('../services/partido.service');

const getAllPartidos = async (req, res) => {
  try {
    const partidos = await partidoService.obtenerTodosLosPartidos();
    res.json(partidos);
  } catch (err) {
    console.error('🔴 Error en getAllPartidos:', err);
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
};

const getPartidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const partido = await partidoService.obtenerPartidoPorId(id);

    if (!partido) {
      return res.status(404).json({ error: 'partido no encontrado' });
    }

    res.json(partido);
  } catch (err) {
    console.error('🔴 Error en getPartidoById:', err);
    res.status(500).json({ error: 'Error al buscar partido' });
  }
};

const createPartido = async (req, res) => {
  try {
    const partido = req.body;
    const result = await partidoService.crearPartido(partido);
    res.status(201).json({ mensaje: 'partido creado correctamente' });
  } catch (err) {
    console.error('🔴 Error en createPartido:', err);
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

const updatePartido = async (req, res) => {
  try {
    const id = req.params.id;
    const partido = req.body;
    const result = await partidoService.actualizarPartido(id, partido);
    res.json({ mensaje: 'partido actualizado correctamente' });
  } catch (err) {
    console.error('🔴 Error en updatePartido:', err);
    res.status(500).json({ error: 'Error al actualizar partido' });
  }
};

const deletePartido = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await partidoService.eliminarPartido(id);
    res.json({ mensaje: 'partido eliminado correctamente' });
  } catch (err) {
    console.error('🔴 Error en deletePartido:', err);
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
};

module.exports = {
  getAllPartidos,
  getPartidoById,
  createPartido,
  updatePartido,
  deletePartido,
};

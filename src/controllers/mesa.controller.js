const mesaService = require('../services/mesa.service');

const getAllMesas = async (req, res) => {
  try {
    const mesas = await mesaService.obtenerTodasLasMesas();
    res.json(mesas);
  } catch (err) {
    console.error('🔴 Error en getAllMesas:', err);
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
};

const getMesaById = async (req, res) => {
  try {
    const mesa = await mesaService.obtenerMesaPorId(req.params.id);
    if (!mesa) return res.status(404).json({ error: 'Mesa no encontrada' });
    res.json(mesa);
  } catch (err) {
    console.error('🔴 Error en getMesaById:', err);
    res.status(500).json({ error: 'Error al buscar la mesa' });
  }
};

const createMesa = async (req, res) => {
  try {
    const nuevaMesa = await mesaService.crearMesa(req.body);
    res.status(201).json(nuevaMesa);
  } catch (err) {
    console.error('🔴 Error en createMesa:', err);
    res.status(500).json({ error: 'Error al crear la mesa' });
  }
};

const updateMesa = async (req, res) => {
  try {
    const mesaActualizada = await mesaService.actualizarMesa(req.params.id, req.body);
    res.json(mesaActualizada);
  } catch (err) {
    console.error('🔴 Error en updateMesa:', err);
    res.status(500).json({ error: 'Error al actualizar la mesa' });
  }
};

const deleteMesa = async (req, res) => {
  try {
    await mesaService.eliminarMesa(req.params.id);
    res.json({ mensaje: 'Mesa eliminada correctamente' });
  } catch (err) {
    console.error('🔴 Error en deleteMesa:', err);
    res.status(500).json({ error: 'Error al eliminar la mesa' });
  }
};

const cerrarMesa = async (req, res) => {
  try {
    await mesaService.cerrarMesa(req.params.id);
    res.json({ mensaje: 'Mesa cerrada correctamente' });
  } catch (err) {
    console.error('🔴 Error en cerrarMesa:', err);
    res.status(500).json({ error: 'No se pudo cerrar la mesa' });
  }
};

module.exports = {
  getAllMesas,
  getMesaById,
  createMesa,
  updateMesa,
  deleteMesa,
  cerrarMesa
};

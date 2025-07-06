const listaService = require('../services/lista.service');

const getAllListas = async (req, res) => {
  try {
    const listas = await listaService.obtenerTodasLasListas();
    res.json(listas);
  } catch (err) {
    console.error('Error en getAllListas:', err);
    res.status(500).json({ error: 'Error al obtener listas' });
  }
};

const getListaById = async (req, res) => {
  try {
    const lista = await listaService.obtenerListaPorId(req.params.id);
    if (!lista) return res.status(404).json({ error: 'lista no encontrada' });
    res.json(lista);
  } catch (err) {
    console.error('Error en getListaById:', err);
    res.status(500).json({ error: 'Error al obtener lista' });
  }
};

const createLista = async (req, res) => {
  try {
    const result = await listaService.crearLista(req.body);
    res.status(201).json({ mensaje: 'lista creada correctamente' });
  } catch (err) {
    console.error('Error en createLista:', err);
    res.status(500).json({ error: 'Error al crear lista' });
  }
};

const updateLista = async (req, res) => {
  try {
    const result = await listaService.actualizarLista(req.params.id, req.body);
    res.json({ mensaje: 'lista actualizada correctamente' });
  } catch (err) {
    console.error('Error en updateLista:', err);
    res.status(500).json({ error: 'Error al actualizar lista' });
  }
};

const deleteLista = async (req, res) => {
  try {
    const result = await listaService.eliminarLista(req.params.id);
    res.json({ mensaje: 'lista eliminada correctamente' });
  } catch (err) {
    console.error('Error en deleteLista:', err);
    res.status(500).json({ error: 'Error al eliminar lista' });
  }
};

const getListasPorCircuitoYEleccion = async (req, res) => {
  try {
    const { id_circuito, id_eleccion } = req.params;
    const listas = await listaService.obtenerListasPorCircuitoYEleccion(id_circuito, id_eleccion);
    res.json(listas);
  } catch (err) {
    console.error('Error en getListasPorCircuitoYEleccion:', err);
    res.status(500).json({ error: 'Error al obtener listas por circuito y elección' });
  }
};

module.exports = {
  getAllListas,
  getListaById,
  createLista,
  updateLista,
  deleteLista,
  getListasPorCircuitoYEleccion
};

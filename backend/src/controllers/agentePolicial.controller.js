const agenteService = require('../services/agentePolicial.service');

const getAllAgentes = async (req, res) => {
  try {
    const agentes = await agenteService.obtenerTodosLosAgentes();
    res.json(agentes);
  } catch (err) {
    console.error('Error en getAllAgentes:', err);
    res.status(500).json({ error: 'Error al obtener agentes policiales' });
  }
};

const getAgenteByCI = async (req, res) => {
  try {
    const { ci } = req.params;
    const agente = await agenteService.obtenerAgentePorCI(ci);
    if (!agente) {
      return res.status(404).json({ error: 'Agente no encontrado' });
    }
    res.json(agente);
  } catch (err) {
    console.error('Error en getAgenteByCI:', err);
    res.status(500).json({ error: 'Error al buscar agente policial' });
  }
};

const createAgente = async (req, res) => {
  try {
    const agente = req.body;
    const result = await agenteService.crearAgente(agente);
    res.status(201).json({ mensaje: 'Agente creado correctamente' });
  } catch (err) {
    console.error('Error en createAgente:', err);
    res.status(500).json({ error: 'Error al crear agente policial' });
  }
};

const deleteAgente = async (req, res) => {
  try {
    const { ci } = req.params;
    const result = await agenteService.eliminarAgente(ci);
    res.json({ mensaje: 'Agente eliminado correctamente' });
  } catch (err) {
    console.error('Error en deleteAgente:', err);
    res.status(500).json({ error: 'Error al eliminar agente policial' });
  }
};

module.exports = {
  getAllAgentes,
  getAgenteByCI,
  createAgente,
  deleteAgente,
};

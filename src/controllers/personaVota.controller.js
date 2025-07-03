const personaVotaService = require('../services/personaVota.service');

const registrarVoto = async (req, res) => {
  try {
    const { ci, id_circuito, id_eleccion, fecha, es_observado } = req.body;

    const resultado = await personaVotaService.crearRegistroVotoPersona({
      ci,
      id_circuito,
      id_eleccion,
      fecha,
      es_observado,
    });

    res.status(201).json({ mensaje: 'Voto registrado correctamente' });
  } catch (error) {
    console.error('🔴 Error en registrarVoto:', error);
    res.status(400).json({ error: error.message });
  }
};


const obtenerTodos = async (req, res) => {
  try {
    const registros = await personaVotaService.getTodosLosRegistros();
    res.json(registros);
  } catch (err) {
    console.error('🔴 Error al obtener registros:', err);
    res.status(500).json({ error: 'Error al obtener registros' });
  }
};

const obtenerPorCI = async (req, res) => {
  try {
    const { ci } = req.params;
    const registros = await personaVotaService.getVotosPorCI(ci);
    res.json(registros);
  } catch (err) {
    console.error('🔴 Error al obtener votos por CI:', err);
    res.status(500).json({ error: 'Error al obtener votos por CI' });
  }
};

const obtenerPorEleccion = async (req, res) => {
  try {
    const { id_eleccion } = req.params;
    const registros = await personaVotaService.getVotosPorEleccion(id_eleccion);
    res.json(registros);
  } catch (err) {
    console.error('🔴 Error al obtener votos por elección:', err);
    res.status(500).json({ error: 'Error al obtener votos por elección' });
  }
};

module.exports = {
  registrarVoto,
  obtenerTodos,
  obtenerPorCI,
  obtenerPorEleccion
};

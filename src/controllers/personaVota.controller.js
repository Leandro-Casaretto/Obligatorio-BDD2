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


const obtenerCircuitoAsignado = async (req, res) => {
  try {
    const { ci, id_eleccion } = req.params;
    const resultado = await personaVotaService.obtenerCircuitoAsignado(ci, id_eleccion);

    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ error: 'No se encontró circuito asignado para esa persona' });
    }

    res.json(resultado[0]);
  } catch (err) {
    console.error('🔴 Error al obtener circuito asignado:', err);
    res.status(500).json({ error: 'Error al obtener circuito asignado' });
  }
};

const obtenerNumeroCircuitoAsignado = async (req, res) => {
  try {
    const { ci, id_eleccion } = req.params;
    const resultado = await personaVotaService.obtenerNumeroCircuitoAsignado(ci, id_eleccion);
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ error: 'No se encontró circuito asignado para esa persona' });
    }
    res.json({ numero_circuito: resultado[0].numero_circuito });
  } catch (err) {
    console.error('🔴 Error al obtener número de circuito asignado:', err);
    res.status(500).json({ error: 'Error al obtener número de circuito asignado' });
  }
};

module.exports = {
  registrarVoto,
  obtenerTodos,
  obtenerPorCI,
  obtenerPorEleccion,
  obtenerCircuitoAsignado,
  obtenerNumeroCircuitoAsignado
};

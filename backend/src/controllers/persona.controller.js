const personaModel = require('../models/persona.model');
const personaService = require('../services/persona.service');

const getAllPersonas = async (req, res) => {
  try {
    const personas = await personaService.obtenerTodasLasPersonas();
    res.json(personas);
  } catch (err) {
    console.error('Error en getAllPersonas:', err);
    res.status(500).json({ error: 'Error al obtener personas' });
  }
};

const getPersonaByCI = async (req, res) => {
  try {
    const ci = req.params.ci;
    const persona = await personaService.obtenerPersonaPorCI(ci);

    if (!persona) {
      return res.status(404).json({ error: 'persona no encontrada' });
    }

    res.json(persona);
  } catch (err) {
    console.error('Error en getPersonaByCI:', err);
    res.status(500).json({ error: 'Error al buscar persona' });
  }
};

const crearPersona = async (req, res) => {
  try {
    const nuevaPersona = req.body;
    await personaService.crearPersona(nuevaPersona);
    res.status(201).json({ mensaje: 'persona creada correctamente' });
  } catch (err) {
    console.error('Error en crearPersona:', err);
    res.status(500).json({ error: 'Error al crear persona' });
  }
};

const actualizarPersona = async (req, res) => {
  try {
    const ci = req.params.ci;
    const datosActualizados = req.body;
    await personaService.actualizarPersona(ci, datosActualizados);
    res.json({ mensaje: 'persona actualizada correctamente' });
  } catch (err) {
    console.error('Error en actualizarPersona:', err);
    res.status(500).json({ error: 'Error al actualizar persona' });
  }
};

const eliminarPersona = async (req, res) => {
  try {
    const ci = req.params.ci;
    await personaService.eliminarPersona(ci);
    res.json({ mensaje: 'persona eliminada correctamente' });
  } catch (err) {
    console.error('Error en eliminarPersona:', err);
    res.status(500).json({ error: 'Error al eliminar persona' });
  }
};




module.exports = { getAllPersonas, getPersonaByCI, crearPersona, actualizarPersona, eliminarPersona };

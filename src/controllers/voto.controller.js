const votoService = require('../services/voto.service');

const createVoto = async (req, res) => {
  try {
    const voto = req.body;
    const result = await votoService.crearVoto(voto);
    res.status(201).json({ mensaje: 'Voto registrado correctamente' });
  } catch (err) {
    console.error('🔴 Error en createVoto:', err);
    res.status(500).json({ error: 'Error al registrar el voto' });
  }
};

const getAllVotos = async (req, res) => {
  try {
    const votos = await votoService.obtenerTodosLosVotos();
    res.json(votos);
  } catch (err) {
    console.error('🔴 Error en getAllVotos:', err);
    res.status(500).json({ error: 'Error al obtener los votos' });
  }
};

const getVotoById = async (req, res) => {
  try {
    const id = req.params.id;
    const voto = await votoService.obtenerVotoPorId(id);

    if (!voto) {
      return res.status(404).json({ error: 'Voto no encontrado' });
    }

    res.json(voto);
  } catch (err) {
    console.error('🔴 Error en getVotoById:', err);
    res.status(500).json({ error: 'Error al buscar el voto' });
  }
};

module.exports = {
  createVoto,
  getAllVotos,
  getVotoById
};

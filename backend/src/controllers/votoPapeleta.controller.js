const votoPapeletaService = require('../services/votoPapeleta.service');

const crearVotoPapeleta = async (req, res) => {
  try {
    const { id_voto, id_papeleta } = req.body;

    if (!id_voto || !id_papeleta) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const result = await votoPapeletaService.asociarVotoPapeleta(id_voto, id_papeleta);
    res.status(201).json({ mensaje: 'voto asociado a papeleta correctamente' });
  } catch (err) {
    console.error('🔴 Error en crearVotoPapeleta:', err);
    res.status(500).json({ error: 'Error al asociar voto a papeleta' });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const votos = await votoPapeletaService.obtenerVotoPapeleta();
    res.json(votos);
  } catch (err) {
    console.error('🔴 Error en obtenerTodos voto_papeleta:', err);
    res.status(500).json({ error: 'Error al obtener votos a papeletas' });
  }
};

module.exports = {
  crearVotoPapeleta,
  obtenerTodos
};

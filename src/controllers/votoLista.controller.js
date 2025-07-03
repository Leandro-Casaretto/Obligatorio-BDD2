const votoListaService = require('../services/votoLista.service');

const crearVotoLista = async (req, res) => {
  try {
    const { id_voto, id_lista } = req.body;
    const result = await votoListaService.agregarVotoALista(id_voto, id_lista);
    res.status(201).json({ mensaje: 'Voto asociado a lista' });
  } catch (err) {
    console.error('🔴 Error en crearVotoLista:', err);
    res.status(500).json({ error: 'Error al asociar voto con lista' });
  }
};

const obtenerVotosLista = async (req, res) => {
  try {
    const result = await votoListaService.listarVotosLista();
    res.json(result);
  } catch (err) {
    console.error('🔴 Error en obtenerVotosLista:', err);
    res.status(500).json({ error: 'Error al obtener votos por lista' });
  }
};

module.exports = {
  crearVotoLista,
  obtenerVotosLista,
};

const candidatoListaService = require('../services/candidatoLista.service');

const crearRelacion = async (req, res) => {
  try {
    const datos = req.body;
    const result = await candidatoListaService.crearRelacion(datos);
    res.status(201).json({ mensaje: 'candidato asociado a lista correctamente' });
  } catch (err) {
    console.error('Error al asociar candidato:', err);
    res.status(500).json({ error: 'Error al asociar candidato' });
  }
};

const getTodasRelaciones = async (req, res) => {
  try {
    const relaciones = await candidatoListaService.getTodasRelaciones();
    res.json(relaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener asociaciones' });
  }
};

const getRelacionesPorLista = async (req, res) => {
  try {
    const { id_lista } = req.params;
    const relaciones = await candidatoListaService.getRelacionesPorLista(id_lista);
    res.json(relaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener candidatos por lista' });
  }
};

module.exports = { crearRelacion, getTodasRelaciones, getRelacionesPorLista };

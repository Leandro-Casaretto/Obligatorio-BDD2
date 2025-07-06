const service = require('../services/listaApoya.service');

const crearRelacion = async (req, res) => {
  try {
    const result = await service.crearRelacion(req.body);
    res.json({ mensaje: 'Relación creada correctamente', result });
  } catch (err) {
    console.error('Error en crearRelacion:', err);
    res.status(500).json({ error: 'Error al crear la relación' });
  }
};

const getTodas = async (req, res) => {
  try {
    const resultados = await service.getTodas();
    res.json(resultados);
  } catch (err) {
    console.error('Error en getTodas:', err);
    res.status(500).json({ error: 'Error al obtener relaciones' });
  }
};

module.exports = {
  crearRelacion,
  getTodas
};

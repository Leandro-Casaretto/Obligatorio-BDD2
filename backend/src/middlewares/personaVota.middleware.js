module.exports = (req, res, next) => {
  const { ci, id_circuito, id_eleccion, fecha, es_observado } = req.body;

  if (!ci || !id_circuito || !id_eleccion || !fecha || es_observado === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  if (typeof es_observado !== 'boolean') {
    return res.status(400).json({ error: 'es_observado debe ser true o false' });
  }

  const parsedDate = new Date(fecha);
  const now = new Date();

  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: 'La fecha no es válida' });
  }

  if (parsedDate > now) {
    return res.status(400).json({ error: 'La fecha no puede ser futura' });
  }

  next();
};

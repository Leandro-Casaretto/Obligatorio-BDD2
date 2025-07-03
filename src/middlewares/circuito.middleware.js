module.exports = (req, res, next) => {
  const { numero_circuito, es_accesible, municipio, id_establecimiento, id_eleccion } = req.body;

  if (
    numero_circuito == null ||
    es_accesible == null ||
    !municipio ||
    !id_establecimiento ||
    !id_eleccion
  ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para el circuito' });
  }

  next();
};

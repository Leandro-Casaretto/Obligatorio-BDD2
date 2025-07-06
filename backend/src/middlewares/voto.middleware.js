module.exports = (req, res, next) => {
  const { estado, es_observado, id_circuito, id_eleccion } = req.body;

  const estadosValidos = ['valido', 'anulado'];

  if (!estado || !estadosValidos.includes(estado.toLowerCase())) {
    return res.status(400).json({
      error: 'El estado del voto debe ser "valido" o "anulado"',
    });
  }

  if (typeof es_observado !== 'boolean') {
    return res.status(400).json({ error: 'El campo es_observado debe ser booleano' });
  }

  if (!id_circuito || !id_eleccion) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: id_circuito o id_eleccion' });
  }

  next();
};

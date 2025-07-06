module.exports = (req, res, next) => {
  const { ci, comisaria, id_establecimiento } = req.body;

  if (!ci || isNaN(ci)) {
    return res.status(400).json({ error: 'La cédula (ci) es obligatoria y debe ser un número' });
  }

  if (!comisaria || comisaria.trim() === '') {
    return res.status(400).json({ error: 'La comisaría es obligatoria' });
  }

  if (!id_establecimiento || isNaN(id_establecimiento)) {
    return res.status(400).json({ error: 'El id del establecimiento es obligatorio y debe ser un número' });
  }

  next();
};

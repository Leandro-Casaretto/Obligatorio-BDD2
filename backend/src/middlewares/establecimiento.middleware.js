module.exports = (req, res, next) => {
  const { direccion, tipo, zona, id_departamento } = req.body;

  if (!direccion || direccion.trim() === '') {
    return res.status(400).json({ error: 'La dirección es obligatoria' });
  }
  if (!tipo || tipo.trim() === '') {
    return res.status(400).json({ error: 'El tipo es obligatorio' });
  }
  if (!zona || zona.trim() === '') {
    return res.status(400).json({ error: 'La zona es obligatoria' });
  }
  if (!id_departamento || isNaN(id_departamento)) {
    return res.status(400).json({ error: 'El ID del departamento es obligatorio y debe ser numérico' });
  }

  next();
};

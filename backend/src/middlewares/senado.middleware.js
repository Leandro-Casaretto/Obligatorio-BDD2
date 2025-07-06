module.exports = (req, res, next) => {
  const { nombre, id_partido } = req.body;
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre del senado es obligatorio' });
  }
  if (!id_partido || isNaN(id_partido)) {
    return res.status(400).json({ error: 'El ID del partido es obligatorio y debe ser numérico' });
  }
  next();
};

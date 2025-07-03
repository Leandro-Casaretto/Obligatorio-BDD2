module.exports = (req, res, next) => {
  const { ci_presidente, ci_vicepresidente, id_partido } = req.body;

  if (!ci_presidente || !ci_vicepresidente || !id_partido) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if (ci_presidente === ci_vicepresidente) {
    return res.status(400).json({ error: 'El presidente y vicepresidente deben ser diferentes personas' });
  }

  next();
};

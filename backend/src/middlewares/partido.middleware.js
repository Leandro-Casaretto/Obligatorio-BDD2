module.exports = (req, res, next) => {
  const { nombre, presidente, vicepresidente, direccion_sede } = req.body;
  if (!nombre || !presidente || !vicepresidente || !direccion_sede) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  next();
};

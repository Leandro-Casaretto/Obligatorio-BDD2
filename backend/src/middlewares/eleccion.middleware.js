module.exports = (req, res, next) => {
  const { fecha, tipo, descripcion } = req.body;

  if (!fecha || !tipo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: fecha y tipo' });
  }

  next();
};

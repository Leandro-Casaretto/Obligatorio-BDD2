module.exports = (req, res, next) => {
  const { descripcion, color, id_eleccion } = req.body;

  if (!descripcion || !descripcion.trim()) {
    return res.status(400).json({ error: 'La descripción es obligatoria' });
  }

  if (!color || !color.trim()) {
    return res.status(400).json({ error: 'El color es obligatorio' });
  }

  if (!id_eleccion) {
    return res.status(400).json({ error: 'Se requiere el id de la elección' });
  }

  next();
};

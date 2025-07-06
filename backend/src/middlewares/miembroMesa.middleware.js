module.exports = (req, res, next) => {
  const { ci, organismo, rol, id_mesa } = req.body;

  if (!ci || !organismo || !rol || !id_mesa) {
    return res.status(400).json({ error: 'Faltan datos obligatorios del miembro de mesa' });
  }

  next();
};

module.exports = (req, res, next) => {
  const { id_voto, id_lista } = req.body;

  if (!id_voto || !id_lista) {
    return res.status(400).json({ error: 'id_voto y id_lista son obligatorios' });
  }

  next();
};

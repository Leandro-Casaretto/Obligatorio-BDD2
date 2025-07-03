module.exports = (req, res, next) => {
  const { numero_mesa, estado, id_circuito } = req.body;

  if (!numero_mesa || !estado || !id_circuito) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: numero_mesa, estado, id_circuito' });
  }

  next();
};

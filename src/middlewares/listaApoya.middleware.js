module.exports = (req, res, next) => {
  const { id_lista, id_partido, id_senado, id_formula } = req.body;

  if (!id_lista || !id_partido || !id_senado || !id_formula) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  next();
};

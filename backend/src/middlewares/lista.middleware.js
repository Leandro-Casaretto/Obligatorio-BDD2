module.exports = (req, res, next) => {
  const { numero_lista, id_eleccion, id_departamento } = req.body;
  if (
    numero_lista === undefined ||
    isNaN(numero_lista) ||
    !id_eleccion ||
    !id_departamento
  ) {
    return res.status(400).json({ error: 'Datos inválidos para crear/modificar la lista' });
  }
  next();
};

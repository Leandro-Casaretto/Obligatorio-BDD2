const departamentosValidos = [
  'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno',
  'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo',
  'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto',
  'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres'
];

module.exports = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre del departamento es obligatorio' });
  }

  const nombreNormalizado = nombre.trim().toLowerCase();
  const esValido = departamentosValidos.some(dep => dep.toLowerCase() === nombreNormalizado);

  if (!esValido) {
    return res.status(400).json({ error: 'El nombre del departamento no es válido en Uruguay' });
  }

  next();
};

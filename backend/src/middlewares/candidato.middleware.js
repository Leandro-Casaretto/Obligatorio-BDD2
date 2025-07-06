const db = require('../db');

const validarCandidato = (req, res, next) => {
  const { ci } = req.body;

  if (!ci) {
    return res.status(400).json({ error: 'El campo CI es obligatorio' });
  }

  const sql = 'SELECT * FROM Persona WHERE ci = ?';
  db.query(sql, [ci], (err, results) => {
    if (err) {
      console.error('🔴 Error al validar CI en Persona:', err);
      return res.status(500).json({ error: 'Error al validar el CI' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'La persona con ese CI no existe' });
    }

    next();
  });
};

module.exports = validarCandidato;

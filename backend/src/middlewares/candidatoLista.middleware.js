const db = require('../db');

module.exports = (req, res, next) => {
  const { ci, id_lista, organo, orden } = req.body;

  if (!ci || !id_lista || !organo || orden === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if (typeof orden !== 'number' || orden < 1) {
    return res.status(400).json({ error: 'El orden debe ser un número positivo' });
  }

  const sql = 'SELECT * FROM Candidato_Lista WHERE id_lista = ? AND orden = ?';
  db.query(sql, [id_lista, orden], (err, results) => {
    if (err) {
      console.error('Error al verificar orden duplicado:', err);
      return res.status(500).json({ error: 'Error al verificar el orden del candidato' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Ya existe un candidato con ese orden en la lista' });
    }

    next();
  });
};

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', verifyToken, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido al recurso protegido',
    usuario: req.usuario,
  });
});

module.exports = router;

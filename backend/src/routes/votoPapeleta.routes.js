const express = require('express');
const router = express.Router();
const votoPapeletaController = require('../controllers/votoPapeleta.controller');

router.post('/', votoPapeletaController.crearVotoPapeleta);
router.get('/', votoPapeletaController.obtenerTodos);

module.exports = router;

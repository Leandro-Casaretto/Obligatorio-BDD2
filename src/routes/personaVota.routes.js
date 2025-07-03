const express = require('express');
const router = express.Router();
const controller = require('../controllers/personaVota.controller');

router.post('/', controller.registrarVoto);
router.get('/', controller.obtenerTodos);
router.get('/ci/:ci', controller.obtenerPorCI);
router.get('/eleccion/:id_eleccion', controller.obtenerPorEleccion);

module.exports = router;

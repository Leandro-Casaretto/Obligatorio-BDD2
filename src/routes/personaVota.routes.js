const express = require('express');
const router = express.Router();
const controller = require('../controllers/personaVota.controller');

router.post('/', controller.registrarVoto);
router.get('/', controller.obtenerTodos);
router.get('/ci/:ci', controller.obtenerPorCI);
router.get('/eleccion/:id_eleccion', controller.obtenerPorEleccion);
router.get('/:ci/:id_eleccion/numero-circuito', controller.obtenerNumeroCircuitoAsignado);
router.get('/:ci/:id_eleccion', controller.obtenerCircuitoAsignado);


module.exports = router;

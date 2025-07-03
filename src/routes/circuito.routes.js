const express = require('express');
const router = express.Router();
const circuitoController = require('../controllers/circuito.controller');
const validarCircuito = require('../middlewares/circuito.middleware');

router.get('/', circuitoController.getAllCircuitos);
router.get('/:id', circuitoController.getCircuitoById);
router.post('/', validarCircuito, circuitoController.createCircuito);
router.put('/:id', validarCircuito, circuitoController.updateCircuito);
router.delete('/:id', circuitoController.deleteCircuito);

module.exports = router;

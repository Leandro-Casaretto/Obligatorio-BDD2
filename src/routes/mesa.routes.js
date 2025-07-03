const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesa.controller');
const validarMesa = require('../middlewares/mesa.middleware');

router.get('/', mesaController.getAllMesas);
router.get('/:id', mesaController.getMesaById);
router.post('/', validarMesa, mesaController.createMesa);
router.put('/:id', validarMesa, mesaController.updateMesa);
router.delete('/:id', mesaController.deleteMesa);

module.exports = router;

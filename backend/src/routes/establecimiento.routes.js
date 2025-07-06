const express = require('express');
const router = express.Router();
const establecimientoController = require('../controllers/establecimiento.controller');
const validarEstablecimiento = require('../middlewares/establecimiento.middleware');

router.get('/', establecimientoController.getAll);
router.get('/:id', establecimientoController.getById);
router.post('/', validarEstablecimiento, establecimientoController.create);
router.put('/:id', validarEstablecimiento, establecimientoController.update);
router.delete('/:id', establecimientoController.remove);

module.exports = router;

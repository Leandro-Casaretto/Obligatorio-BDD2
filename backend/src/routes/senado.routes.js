const express = require('express');
const router = express.Router();
const senadoController = require('../controllers/senado.controller');
const validarSenado = require('../middlewares/senado.middleware');

router.get('/', senadoController.getAllSenados);
router.get('/:id', senadoController.getSenadoById);
router.post('/', validarSenado, senadoController.createSenado);
router.put('/:id', validarSenado, senadoController.updateSenado);
router.delete('/:id', senadoController.deleteSenado);

module.exports = router;

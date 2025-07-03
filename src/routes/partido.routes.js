const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partido.controller');
const validarPartido = require('../middlewares/partido.middleware');

router.get('/', partidoController.getAllPartidos);
router.get('/:id', partidoController.getPartidoById);
router.post('/', validarPartido, partidoController.createPartido);
router.put('/:id', validarPartido, partidoController.updatePartido);
router.delete('/:id', partidoController.deletePartido);

module.exports = router;

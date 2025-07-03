const express = require('express');
const router = express.Router();
const votoController = require('../controllers/voto.controller');
const validarVoto = require('../middlewares/voto.middleware');

router.post('/', validarVoto, votoController.createVoto);
router.get('/', votoController.getAllVotos);
router.get('/:id', votoController.getVotoById);

module.exports = router;

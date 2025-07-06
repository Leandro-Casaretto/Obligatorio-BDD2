const express = require('express');
const router = express.Router();
const candidatoController = require('../controllers/candidato.controller');
const validarCandidato = require('../middlewares/candidato.middleware');

router.get('/', candidatoController.getAllCandidatos);
router.get('/:ci', candidatoController.getCandidatoByCI);
router.post('/', validarCandidato, candidatoController.createCandidato);
router.delete('/:ci', candidatoController.deleteCandidato);

module.exports = router;

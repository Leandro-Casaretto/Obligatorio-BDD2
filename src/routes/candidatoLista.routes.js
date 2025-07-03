const express = require('express');
const router = express.Router();
const candidatoListaController = require('../controllers/candidatoLista.controller');
const validarCandidatoLista = require('../middlewares/candidatoLista.middleware');

router.post('/', validarCandidatoLista, candidatoListaController.crearRelacion);
router.get('/', candidatoListaController.getTodasRelaciones);
router.get('/:id_lista', candidatoListaController.getRelacionesPorLista);

module.exports = router;

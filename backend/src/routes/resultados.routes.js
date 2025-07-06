const express = require('express');
const router = express.Router();
const resultadosController = require('../controllers/resultados.controller');

router.get('/circuito/:id/por-lista', resultadosController.resultadosPorLista);
router.get('/circuito/:id/por-partido', resultadosController.resultadosPorPartido);
router.get('/circuito/por-candidato/:id', resultadosController.resultadosPorCandidato);
router.get('/departamento/:id/por-lista', resultadosController.resultadosPorListaDepartamento);
router.get('/departamento/:id/por-partido', resultadosController.resultadosPorPartidoDepartamento);
router.get('/departamento/:id/por-candidato', resultadosController.resultadosPorCandidatoDepartamento);
router.get('/ganador-por-departamento', resultadosController.candidatoGanadorPorDepartamento);


module.exports = router;

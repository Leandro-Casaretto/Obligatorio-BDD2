const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamento.controller');
const validarDepartamento = require('../middlewares/departamento.middleware');

router.get('/', departamentoController.getAllDepartamentos);
router.get('/:id', departamentoController.getDepartamentoById);
router.post('/', validarDepartamento, departamentoController.createDepartamento);
router.put('/:id', validarDepartamento, departamentoController.updateDepartamento);
router.delete('/:id', departamentoController.deleteDepartamento);

module.exports = router;

const express = require('express');
const router = express.Router();
const formulaController = require('../controllers/formula.controller');
const validarFormula = require('../middlewares/formula.middleware');

router.get('/', formulaController.getAllFormulas);
router.get('/:id', formulaController.getFormulaById);
router.post('/', validarFormula, formulaController.createFormula);
router.delete('/:id', formulaController.deleteFormula);

module.exports = router;

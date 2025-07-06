const express = require('express');
const router = express.Router();
const eleccionController = require('../controllers/eleccion.controller');

router.get('/', eleccionController.getAllElecciones);
router.get('/:id', eleccionController.getEleccionById);
router.post('/', eleccionController.createEleccion);
router.put('/:id', eleccionController.updateEleccion);
router.delete('/:id', eleccionController.deleteEleccion);

module.exports = router;

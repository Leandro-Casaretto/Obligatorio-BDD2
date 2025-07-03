const express = require('express');
const router = express.Router();
const listaController = require('../controllers/lista.controller');
const validarLista = require('../middlewares/lista.middleware');

router.get('/', listaController.getAllListas);
router.get('/:id', listaController.getListaById);
router.post('/', validarLista, listaController.createLista);
router.put('/:id', validarLista, listaController.updateLista);
router.delete('/:id', listaController.deleteLista);

module.exports = router;

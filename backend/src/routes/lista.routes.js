const express = require('express');
const router = express.Router();
const listaController = require('../controllers/lista.controller');
const validarLista = require('../middlewares/lista.middleware');

router.get('/', listaController.getAllListas);
router.get('/por-circuito/:id_circuito/:id_eleccion', listaController.getListasPorCircuitoYEleccion);
router.get('/:id', listaController.getListaById);
router.post('/', validarLista, listaController.createLista);
router.put('/:id', validarLista, listaController.updateLista);
router.delete('/:id', listaController.deleteLista);
router.get('/por-circuito/:id_circuito/:id_eleccion', listaController.getListasPorCircuitoYEleccion);

module.exports = router;

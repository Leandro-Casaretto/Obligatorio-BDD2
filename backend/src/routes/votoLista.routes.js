const express = require('express');
const router = express.Router();
const controller = require('../controllers/votoLista.controller');
const validar = require('../middlewares/votoLista.middleware');

router.post('/', validar, controller.crearVotoLista);
router.get('/', controller.obtenerVotosLista);

module.exports = router;

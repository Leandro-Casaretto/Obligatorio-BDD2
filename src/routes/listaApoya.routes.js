const express = require('express');
const router = express.Router();
const controller = require('../controllers/listaApoya.controller');
const middleware = require('../middlewares/listaApoya.middleware');

router.post('/', middleware, controller.crearRelacion);
router.get('/', controller.getTodas);

module.exports = router;

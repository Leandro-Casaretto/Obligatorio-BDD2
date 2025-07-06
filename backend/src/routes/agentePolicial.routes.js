const express = require('express');
const router = express.Router();
const agenteController = require('../controllers/agentePolicial.controller');
const middleware = require('../middlewares/agentePolicial.middleware');


router.get('/', agenteController.getAllAgentes);
router.get('/:ci', agenteController.getAgenteByCI);
router.post('/', middleware, agenteController.createAgente);
router.delete('/:ci', agenteController.deleteAgente);

module.exports = router;

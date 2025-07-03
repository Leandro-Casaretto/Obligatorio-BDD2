const express = require('express');
const router = express.Router();
const controller = require('../controllers/papeleta.controller');
const validarPapeleta = require('../middlewares/papeleta.middleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validarPapeleta, controller.create);
router.put('/:id', validarPapeleta, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;

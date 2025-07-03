const express = require('express');
const router = express.Router();
const controller = require('../controllers/miembroMesa.controller');

router.get('/', controller.getAll);
router.get('/:ci', controller.getByCI);
router.post('/', controller.create);
router.delete('/:ci', controller.remove);

module.exports = router;

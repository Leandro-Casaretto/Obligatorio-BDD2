const express = require('express');
const router = express.Router();
const personaController = require('../controllers/persona.controller');

router.get('/', personaController.getAllPersonas);
router.get('/:ci', personaController.getPersonaByCI);
router.post('/', personaController.crearPersona);
router.put('/:ci', personaController.actualizarPersona);
router.delete('/:ci', personaController.eliminarPersona);




module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/registrar', authController.registrarUsuario);
router.post('/login-presidente', authController.loginPresidente);

module.exports = router;

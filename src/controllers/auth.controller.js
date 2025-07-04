const authService = require('../services/auth.service');

const login = (req, res) => {
  const { cc, password } = req.body;

  if (!cc || !password) {
    return res.status(400).json({ error: 'Credencial y contraseña requeridas.' });
  }

  authService.login(cc, password, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor.' });
    if (!result) return res.status(401).json({ error: 'Credenciales incorrectas.' });

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        ci: result.usuario.ci,
        cc: result.usuario.cc,
      },
      token: result.token,
    });
  });
};

module.exports = { login };

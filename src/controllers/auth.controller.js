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
        nombre: result.usuario.nombre,
        apellido: result.usuario.apellido,
      },
      token: result.token,
    });
  });
};

const loginPresidente = (req, res) => {
  const { cc, password } = req.body;

  if (!cc || !password) {
    return res.status(400).json({ error: 'Credencial y contraseña requeridas.' });
  }

  authService.loginPresidente(cc, password, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor.' });
    if (!result) return res.status(401).json({ error: 'Credenciales incorrectas.' });
    if (result.error) return res.status(403).json({ error: result.error });

    res.json({
      mensaje: 'Login de presidente exitoso',
      usuario: {
        ci: result.usuario.ci,
        cc: result.usuario.cc,
        nombre: result.usuario.nombre,
        apellido: result.usuario.apellido,
      },
      mesa: result.mesa,
      token: result.token,
    });
  });
};

const registrarUsuario = async (req, res) => {
  try {
    const { ci, cc, password } = req.body;

    if (!ci || !cc || !password) {
      return res.status(400).json({ error: 'CI, credencial cívica y contraseña son requeridos.' });
    }

    await authService.registrarUsuario({ ci, cc, password });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, registrarUsuario, loginPresidente };

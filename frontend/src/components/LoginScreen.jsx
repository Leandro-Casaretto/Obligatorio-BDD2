import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, Paper } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function LoginScreen() {
  const [cc, setCC] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Obtenemos el login del contexto 
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Enviamos las credenciales al backend
      const res = await axios.post('http://localhost:3000/auth/login', { cc, password });
      // Si el login es exitoso, guardamos el token y la data en el contexto 
      login(res.data.usuario, res.data.token);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: '#f7f9fb', // fondo claro
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <HowToVoteIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Sistema de Votación
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
            Ingrese sus credenciales para comenzar
          </Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <TextField
            label="Credencial Cívica"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cc}
            onChange={(e) => setCC(e.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2, fontWeight: 600 }}>
            INGRESAR
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
}

export default LoginScreen;

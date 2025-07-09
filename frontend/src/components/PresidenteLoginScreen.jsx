import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';

function PresidenteLoginScreen({ onLoginSuccess, onVolver }) {
  const [cc, setCC] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Enviamos las credenciales al endpoint de login del presidente
      const res = await axios.post('http://localhost:3000/auth/login-presidente', { cc, password });
      if (onLoginSuccess) onLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: '#f7f9fb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <SecurityIcon sx={{ fontSize: 50, color: 'error.main', mb: 1 }} />
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Acceso Presidente
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
            Panel de administración de mesa
          </Typography>
        </Box>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Acceso Restringido</strong><br />
          Solo personal autorizado puede acceder a esta sección.
        </Alert>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            placeholder="Credencial Cívica"
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
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            size="large"
            sx={{ mt: 2, fontWeight: 600 }}
            disabled={loading}
          >
            ACCEDER
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 3, fontWeight: 600 }}
          onClick={onVolver}
        >
          ← VOLVER AL SISTEMA DE VOTACIÓN
        </Button>
      </Paper>
    </Box>
  );
}

export default PresidenteLoginScreen; 
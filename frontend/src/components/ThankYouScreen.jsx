import { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ThankYouScreen({ onVolverALogin }) {
  const [tiempoRestante, setTiempoRestante] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Llamar a la función para volver al login
          if (onVolverALogin) onVolverALogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onVolverALogin]);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      minWidth: '100vw', 
      backgroundColor: '#f7f9fb', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Paper elevation={3} sx={{ 
        p: 5, 
        borderRadius: 4, 
        minWidth: 400, 
        maxWidth: 600, 
        width: '100%',
        textAlign: 'center'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h3" fontWeight={700} color="success.main" gutterBottom>
            ¡Gracias por votar!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Su voto ha sido registrado exitosamente
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            El sistema volverá automáticamente a la pantalla de inicio en{' '}
            <strong>{tiempoRestante}</strong> segundos
          </Typography>
        </Alert>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            Preparando sistema para siguiente votante...
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default ThankYouScreen; 
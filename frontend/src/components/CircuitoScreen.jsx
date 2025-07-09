import { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Grid } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function CircuitoScreen({ idEleccion = 1, onContinuar, onVolver }) {
  const { usuario } = useAuth();
  const [numeroCircuito, setNumeroCircuito] = useState(null);
  const [idCircuito, setIdCircuito] = useState(null);
  const [inputCircuito, setInputCircuito] = useState('');
  const [verificado, setVerificado] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCircuito = async () => {
      try {
        // Obtener ambos datos: id_circuito y numero_circuito
        const res = await axios.get(`http://localhost:3000/persona-vota/${usuario.ci}/${idEleccion}`);
        setIdCircuito(res.data.id_circuito);
        // Ahora el número visible
        const resNum = await axios.get(`http://localhost:3000/persona-vota/${usuario.ci}/${idEleccion}/numero-circuito`);
        setNumeroCircuito(resNum.data.numero_circuito);
      } catch (err) {
        setError('No se pudo obtener el circuito asignado.');
      }
    };
    if (usuario?.ci) fetchCircuito();
  }, [usuario, idEleccion]);

  const handleVerificar = (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setVerificado(false);
    if (parseInt(inputCircuito) === numeroCircuito) {
      setVerificado(true);
      setMensaje('Circuito verificado correctamente. Puede continuar con el proceso de votación.');
    } else {
      setError('El circuito ingresado no coincide con el asignado. Se notificará al presidente de mesa');
    }
  };

  const handleContinuar = () => {
    if (verificado && idCircuito) {
      onContinuar(idCircuito);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#f7f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, minWidth: 400, maxWidth: 600, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <RoomIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Selección de Circuito
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            Bienvenido, {usuario?.nombre} {usuario?.apellido}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            CI: {usuario?.ci}
          </Typography>
        </Box>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body1">Su Circuito Asignado</Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>{numeroCircuito ?? '-'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <form onSubmit={handleVerificar} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <TextField
                label="Circuito donde desea votar *"
                value={inputCircuito}
                onChange={e => setInputCircuito(e.target.value)}
                type="number"
                required
                size="small"
              />
              <Button type="submit" variant="outlined" color="primary" sx={{ mt: 1 }}>
                VERIFICAR CIRCUITO
              </Button>
            </form>
          </Grid>
        </Grid>
        {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={onVolver}>VOLVER</Button>
          <Button variant="contained" color="primary" disabled={!verificado} onClick={handleContinuar}>
            CONTINUAR A VOTACIÓN
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default CircuitoScreen; 
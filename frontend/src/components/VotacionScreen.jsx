import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function VotacionScreen({ idEleccion = 1, idCircuito, onVotar, onVolver }) {
  const { usuario } = useAuth();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [seleccion, setSeleccion] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
<<<<<<< HEAD
=======
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628

  useEffect(() => {
    const fetchListas = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`http://localhost:3000/listas/por-circuito/${idCircuito}/${idEleccion}`);
        setListas(res.data);
      } catch (err) {
        setError('No se pudieron obtener las listas para votar.');
      } finally {
        setLoading(false);
      }
    };
    if (idCircuito) fetchListas();
  }, [idCircuito, idEleccion]);

  const handleSeleccion = (id_lista) => {
    setSeleccion(id_lista);
    setConfirmado(false);
<<<<<<< HEAD
=======
    setMensaje('');
    setError('');
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628
  };

  const handleVotoBlanco = () => {
    setSeleccion('blanco');
    setConfirmado(false);
<<<<<<< HEAD
=======
    setMensaje('');
    setError('');
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628
  };

  const handleVotoNulo = () => {
    setSeleccion('nulo');
    setConfirmado(false);
<<<<<<< HEAD
  };

  const handleConfirmar = () => {
    setConfirmado(true);
    // Aquí puedes llamar a onVotar(seleccion) para emitir el voto
=======
    setMensaje('');
    setError('');
  };

  const handleConfirmar = async () => {
    setEnviando(true);
    setMensaje('');
    setError('');
    try {
      let tipo_voto = 'valido';
      let id_lista = null;
      if (seleccion === 'blanco') tipo_voto = 'blanco';
      else if (seleccion === 'nulo') tipo_voto = 'anulado';
      else id_lista = seleccion;
      const payload = {
        ci: usuario.ci,
        id_eleccion: idEleccion,
        id_circuito: idCircuito,
        tipo_voto,
        id_lista,
        es_observado: false
      };
      await axios.post('http://localhost:3000/votos/votar', payload);
      setConfirmado(true);
      setMensaje('¡Voto registrado exitosamente!');
      if (onVotar) onVotar();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar el voto');
    } finally {
      setEnviando(false);
    }
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628
  };

  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#f7f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, minWidth: 400, maxWidth: 700, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <HowToVoteIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Votación
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Seleccione la lista por la que desea votar
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
<<<<<<< HEAD
        ) : error ? (
=======
        ) : error && !confirmado ? (
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {listas.map((lista) => (
                <Grid item xs={12} sm={6} md={4} key={lista.id_lista}>
                  <Paper
                    variant={seleccion === lista.id_lista ? 'elevation' : 'outlined'}
                    elevation={seleccion === lista.id_lista ? 6 : 0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderColor: seleccion === lista.id_lista ? 'primary.main' : 'grey.300',
                      backgroundColor: seleccion === lista.id_lista ? 'primary.light' : 'white',
                    }}
                    onClick={() => handleSeleccion(lista.id_lista)}
                  >
                    <Typography variant="h5" color="primary" fontWeight={700}>{lista.numero_lista}</Typography>
                    <Typography variant="body1">{lista.partido}</Typography>
                  </Paper>
                </Grid>
              ))}
              {/* Opción voto en blanco */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  variant={seleccion === 'blanco' ? 'elevation' : 'outlined'}
                  elevation={seleccion === 'blanco' ? 6 : 0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderColor: seleccion === 'blanco' ? 'primary.main' : 'grey.300',
                    backgroundColor: seleccion === 'blanco' ? 'primary.light' : 'white',
                  }}
                  onClick={handleVotoBlanco}
                >
                  <Typography variant="h5" color="primary" fontWeight={700}>Voto en Blanco</Typography>
                </Paper>
              </Grid>
              {/* Opción voto nulo */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  variant={seleccion === 'nulo' ? 'elevation' : 'outlined'}
                  elevation={seleccion === 'nulo' ? 6 : 0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderColor: seleccion === 'nulo' ? 'primary.main' : 'grey.300',
                    backgroundColor: seleccion === 'nulo' ? 'primary.light' : 'white',
                  }}
                  onClick={handleVotoNulo}
                >
                  <Typography variant="h5" color="primary" fontWeight={700}>Voto Nulo</Typography>
                </Paper>
              </Grid>
            </Grid>
            {seleccion && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {seleccion === 'blanco' && 'Has seleccionado: Voto en Blanco'}
                {seleccion === 'nulo' && 'Has seleccionado: Voto Nulo'}
                {typeof seleccion === 'number' && `Has seleccionado la lista número ${seleccion}`}
              </Alert>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
<<<<<<< HEAD
              <Button variant="outlined" onClick={onVolver}>VOLVER</Button>
              <Button variant="contained" color="primary" disabled={!seleccion} onClick={handleConfirmar}>
                CONFIRMAR VOTO
              </Button>
            </Box>
            {confirmado && (
              <Alert severity="success" sx={{ mt: 2 }}>
                ¡Voto registrado! (Aquí deberías llamar a la API para guardar el voto)
              </Alert>
=======
              <Button variant="outlined" onClick={onVolver} disabled={enviando || confirmado}>VOLVER</Button>
              <Button variant="contained" color="primary" disabled={!seleccion || enviando || confirmado} onClick={handleConfirmar}>
                {enviando ? 'Enviando...' : 'CONFIRMAR VOTO'}
              </Button>
            </Box>
            {mensaje && (
              <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>
            )}
            {error && confirmado && (
              <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
>>>>>>> bfd4c8b88f8d0b830f2f1771b3ce32842dc87628
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default VotacionScreen; 
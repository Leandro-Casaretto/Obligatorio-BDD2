import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import CircuitoScreen from './components/CircuitoScreen';
import VotacionScreen from './components/VotacionScreen';
import ConfirmacionScreen from './components/ConfirmacionScreen';
import PresidenteLoginScreen from './components/PresidenteLoginScreen';
import { Fab, Paper, Typography, Button, Box, CircularProgress, Alert, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import axios from 'axios';

function App() {
  const { usuario, logout } = useAuth();
  const [pantalla, setPantalla] = useState('seleccion-circuito');
  const [idCircuito, setIdCircuito] = useState(null);
  const [showPresidenteLogin, setShowPresidenteLogin] = useState(false);
  const [presidenteData, setPresidenteData] = useState(null);
  const [estadoMesa, setEstadoMesa] = useState(null);
  const [loadingMesa, setLoadingMesa] = useState(false);
  const [errorMesa, setErrorMesa] = useState('');
  const [cerrandoMesa, setCerrandoMesa] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [resultados, setResultados] = useState(null);
  const [loadingResultados, setLoadingResultados] = useState(false);
  const [errorResultados, setErrorResultados] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [resultadosDepto, setResultadosDepto] = useState(null);
  const [loadingDepto, setLoadingDepto] = useState(false);
  const [errorDepto, setErrorDepto] = useState('');
  const [ganadoresDepto, setGanadoresDepto] = useState(null);
  const [loadingGanadores, setLoadingGanadores] = useState(false);
  const [errorGanadores, setErrorGanadores] = useState('');

  
  const resetearEstado = () => {
    setPantalla('seleccion-circuito');
    setIdCircuito(null);
    logout(); 
  };

  
  useEffect(() => {
    const fetchEstadoMesa = async () => {
      if (pantalla === 'panel-presidente' && presidenteData) {
        setLoadingMesa(true);
        setErrorMesa('');
        try {
          
          const res = await axios.get(`http://localhost:3000/mesas/${presidenteData.mesa.id_mesa}`);
          setEstadoMesa(res.data.estado); 
        } catch (err) {
          setErrorMesa('No se pudo obtener el estado de la mesa');
        } finally {
          setLoadingMesa(false);
        }
      }
    };
    fetchEstadoMesa();
  }, [pantalla, presidenteData]);

  
  const handleCerrarMesa = async () => {
    setCerrandoMesa(true);
    setErrorMesa('');
    try {
      
      await axios.patch(`http://localhost:3000/mesas/${presidenteData.mesa.id_mesa}/cerrar`);
      setEstadoMesa('cerrada');
      setSnackbar({ open: true, message: 'Mesa cerrada exitosamente', severity: 'success' });
    } catch (err) {
      setErrorMesa(err.response?.data?.error || 'No se pudo cerrar la mesa');
      setSnackbar({ open: true, message: 'No se pudo cerrar la mesa', severity: 'error' });
    } finally {
      setCerrandoMesa(false);
    }
  };

  
  const handleVerResultados = async () => {
    setLoadingResultados(true);
    setErrorResultados('');
    setMostrarResultados(true);
    setLoadingDepto(true);
    setErrorDepto('');
    setLoadingGanadores(true);
    setErrorGanadores('');
    try {
      const idCircuito = presidenteData.mesa.id_circuito;
      const idDepartamento = presidenteData.mesa.id_departamento; 
      const [resLista, resPartido, resCandidato, resListaDepto, resPartidoDepto, resCandidatoDepto, resGanadores] = await Promise.all([
        axios.get(`http://localhost:3000/resultados/circuito/${idCircuito}/por-lista`),
        axios.get(`http://localhost:3000/resultados/circuito/${idCircuito}/por-partido`),
        axios.get(`http://localhost:3000/resultados/circuito/por-candidato/${idCircuito}`),
        idDepartamento ? axios.get(`http://localhost:3000/resultados/departamento/${idDepartamento}/por-lista`) : Promise.resolve({ data: [] }),
        idDepartamento ? axios.get(`http://localhost:3000/resultados/departamento/${idDepartamento}/por-partido`) : Promise.resolve({ data: [] }),
        idDepartamento ? axios.get(`http://localhost:3000/resultados/departamento/${idDepartamento}/por-candidato`) : Promise.resolve({ data: [] }),
        axios.get(`http://localhost:3000/resultados/ganador-por-departamento`)
      ]);
      setResultados({
        porLista: resLista.data,
        porPartido: resPartido.data,
        porCandidato: resCandidato.data
      });
      setResultadosDepto({
        porLista: resListaDepto.data,
        porPartido: resPartidoDepto.data,
        porCandidato: resCandidatoDepto.data
      });
      setGanadoresDepto(resGanadores.data);
    } catch (err) {
      setErrorResultados('No se pudieron obtener los resultados');
      setErrorDepto('No se pudieron obtener los resultados del departamento');
      setErrorGanadores('No se pudieron obtener los ganadores por departamento');
    } finally {
      setLoadingResultados(false);
      setLoadingDepto(false);
      setLoadingGanadores(false);
    }
  };

  // Mostrar login de presidente si está activo
  if (showPresidenteLogin) {
    return (
      <PresidenteLoginScreen
        onLoginSuccess={(data) => {
          setPresidenteData(data);
          setShowPresidenteLogin(false);
          setPantalla('panel-presidente');
        }}
        onVolver={() => setShowPresidenteLogin(false)}
      />
    );
  }

  
  if (pantalla === 'panel-presidente' && presidenteData) {
    
    const idDepartamento = presidenteData.mesa.id_departamento; 

    return (
      <Box sx={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f9fb' }}>
        <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 700, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Panel de Presidente de Mesa
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
            Bienvenido, {presidenteData.usuario.nombre} {presidenteData.usuario.apellido}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            Mesa: <b>{presidenteData.mesa.id_mesa}</b> | Circuito: <b>{presidenteData.mesa.id_circuito}</b>
          </Typography>
          {loadingMesa ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          ) : errorMesa ? (
            <Alert severity="error" sx={{ mb: 2 }}>{errorMesa}</Alert>
          ) : (
            <>
              <Alert severity={estadoMesa === 'cerrada' ? 'warning' : 'success'} sx={{ mb: 2 }}>
                Estado de la mesa: <b>{estadoMesa ? estadoMesa.toUpperCase() : 'Desconocido'}</b>
              </Alert>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {estadoMesa === 'abierta' && (
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleCerrarMesa}
                    disabled={cerrandoMesa}
                  >
                    {cerrandoMesa ? 'Cerrando...' : 'CERRAR MESA'}
                  </Button>
                )}
                {estadoMesa === 'cerrada' && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleVerResultados}
                    disabled={loadingResultados}
                  >
                    {loadingResultados ? 'Cargando...' : 'VER RESULTADOS'}
                  </Button>
                )}
                <Button variant="outlined" color="primary" onClick={() => { setPresidenteData(null); setPantalla('seleccion-circuito'); }}>
                  Cerrar sesión presidente
                </Button>
              </Box>
              {/* Mostrar resultados si corresponde */}
              {mostrarResultados && (
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {/* Resultados del Circuito */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
                        Resultados del Circuito
                      </Typography>
                      {loadingResultados ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                          <CircularProgress />
                        </Box>
                      ) : errorResultados ? (
                        <Alert severity="error" sx={{ mb: 2 }}>{errorResultados}</Alert>
                      ) : resultados ? (
                        <>
                          {/* Ejemplo: Resultados por lista */}
                          {resultados.porLista && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Por Lista</Typography>
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Lista</TableCell>
                                      <TableCell>Partido</TableCell>
                                      <TableCell>Cant. Votos</TableCell>
                                      <TableCell>Porcentaje</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {resultados.porLista.map((row, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{row.lista}</TableCell>
                                        <TableCell>{row.partido}</TableCell>
                                        <TableCell>{row.cantidad_votos}</TableCell>
                                        <TableCell>{row.porcentaje}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          )}
                          {/* Ejemplo: Resultados por partido */}
                          {resultados.porPartido && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Por Partido</Typography>
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Partido</TableCell>
                                      <TableCell>Votos</TableCell>
                                      <TableCell>Porcentaje</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {resultados.porPartido.map((row, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{row.partido}</TableCell>
                                        <TableCell>{row.cantidad_votos}</TableCell>
                                        <TableCell>{row.porcentaje}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          )}
                          {/* Ejemplo: Resultados por candidato */}
                          {resultados.porCandidato && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Por Candidato</Typography>
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Partido</TableCell>
                                      <TableCell>Candidato</TableCell>
                                      <TableCell>Votos</TableCell>
                                      <TableCell>Porcentaje</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {resultados.porCandidato.map((row, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{row.partido}</TableCell>
                                        <TableCell>{row.candidato}</TableCell>
                                        <TableCell>{row.cantidad_votos}</TableCell>
                                        <TableCell>{row.porcentaje}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          )}
                        </>
                      ) : null}
                    </Box>
                  </Grid>
                  {/* Resultados del Departamento */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
                        Resultados del Departamento
                      </Typography>
                      {loadingDepto ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                          <CircularProgress />
                        </Box>
                      ) : errorDepto ? (
                        <Alert severity="error" sx={{ mb: 2 }}>{errorDepto}</Alert>
                      ) : resultadosDepto ? (
                        <>
                          {/* Resultados por lista departamento */}
                          {resultadosDepto.porLista && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Por Lista</Typography>
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Lista</TableCell>
                                      <TableCell>Partido</TableCell>
                                      <TableCell>Cant. Votos</TableCell>
                                      <TableCell>Porcentaje</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {resultadosDepto.porLista.map((row, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{row.lista}</TableCell>
                                        <TableCell>{row.partido}</TableCell>
                                        <TableCell>{row.cantidad_votos}</TableCell>
                                        <TableCell>{row.porcentaje}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          )}
                          {/* Resultados por partido departamento */}
                          {resultadosDepto.porPartido && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Por Partido</Typography>
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Partido</TableCell>
                                      <TableCell>Votos</TableCell>
                                      <TableCell>Porcentaje</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {resultadosDepto.porPartido.map((row, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{row.partido}</TableCell>
                                        <TableCell>{row.cantidad_votos}</TableCell>
                                        <TableCell>{row.porcentaje}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          )}
                          {/* Resultados por candidato departamento */}
                          {resultadosDepto.porCandidato && (
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Por Candidato</Typography>
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Partido</TableCell>
                                      <TableCell>Candidato</TableCell>
                                      <TableCell>Votos</TableCell>
                                      <TableCell>Porcentaje</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {resultadosDepto.porCandidato.map((row, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{row.partido}</TableCell>
                                        <TableCell>{row.candidato}</TableCell>
                                        <TableCell>{row.cantidad_votos}</TableCell>
                                        <TableCell>{row.porcentaje}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          )}
                        </>
                      ) : null}
                    </Box>
                  </Grid>
                  {/* Ganadores por Departamento */}
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="h5" fontWeight={700} align="center" gutterBottom sx={{ mt: 3, mb: 2 }}>
                        Ganadores por Departamento
                      </Typography>
                      {loadingGanadores ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                          <CircularProgress />
                        </Box>
                      ) : errorGanadores ? (
                        <Alert severity="error" sx={{ mb: 2 }}>{errorGanadores}</Alert>
                      ) : ganadoresDepto && ganadoresDepto.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell><strong>Departamento</strong></TableCell>
                                <TableCell><strong>Partido Ganador</strong></TableCell>
                                <TableCell><strong>Candidato Presidente</strong></TableCell>
                                <TableCell><strong>Votos Obtenidos</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {ganadoresDepto.map((ganador, idx) => (
                                <TableRow key={idx} sx={{ backgroundColor: idx % 2 === 0 ? '#f5f5f5' : 'white' }}>
                                  <TableCell><strong>{ganador.departamento}</strong></TableCell>
                                  <TableCell>{ganador.partido}</TableCell>
                                  <TableCell>{ganador.presidente}</TableCell>
                                  <TableCell>{ganador.cantidad_votos}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          No hay datos de ganadores disponibles
                        </Alert>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    );
  }

  if (!usuario) {
    return (
      <>
        <LoginScreen />
        <Fab
          color="error"
          aria-label="presidente"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          onClick={() => setShowPresidenteLogin(true)}
        >
          <SecurityIcon />
        </Fab>
      </>
    );
  }

  if (pantalla === 'seleccion-circuito') {
    return (
      <>
        <CircuitoScreen
          onContinuar={(id_circuito) => {
            setIdCircuito(id_circuito);
            setPantalla('votacion');
          }}
          onVolver={resetearEstado}
        />
        <Fab
          color="error"
          aria-label="presidente"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          onClick={() => setShowPresidenteLogin(true)}
        >
          <SecurityIcon />
        </Fab>
      </>
    );
  }

  if (pantalla === 'votacion') {
    return (
      <VotacionScreen
        idCircuito={idCircuito}
        idEleccion={1}
        onVotar={() => setPantalla('final')}
        onVolver={() => setPantalla('seleccion-circuito')}
      />
    );
  }

  if (pantalla === 'final') {
    return (
      <ConfirmacionScreen 
        onVolverALogin={resetearEstado}
      />
    );
  }

  return null;
}

export default App;

const express = require('express');
const db = require('./db');
require('dotenv').config();

const personaRoutes = require('./routes/persona.routes');
const departamentoRoutes = require('./routes/departamento.routes');
const establecimientosRoutes = require('./routes/establecimiento.routes');
const eleccionRoutes = require('./routes/eleccion.routes');
const circuitoRoutes = require('./routes/circuito.routes');
const mesaRoutes = require('./routes/mesa.routes');
const candidatoRoutes = require('./routes/candidato.routes');
const miembroMesaRoutes = require('./routes/miembroMesa.routes');
const agentePolicialRoutes = require('./routes/agentePolicial.routes');
const partidoRoutes = require('./routes/partido.routes');
const formulaRoutes = require('./routes/formula.routes');
const senadoRoutes = require('./routes/senado.routes');
const papeletaRoutes = require('./routes/papeleta.routes');
const listaRoutes = require('./routes/lista.routes');
const votoRoutes = require('./routes/voto.routes');
const votoListaRoutes = require('./routes/votoLista.routes');
const votoPapeletaRoutes = require('./routes/votoPapeleta.routes');
const personaVotaRoutes = require('./routes/personaVota.routes');
const listaApoyaRoutes = require('./routes/listaApoya.routes');
const candidatoListaRoutes = require('./routes/candidatoLista.routes');
const resultadosRoutes = require('./routes/resultados.routes');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});

app.use('/personas', personaRoutes);
app.use('/departamentos', departamentoRoutes);
app.use('/establecimientos', establecimientosRoutes);
app.use('/elecciones', eleccionRoutes);
app.use('/circuitos', circuitoRoutes);
app.use('/mesas', mesaRoutes);
app.use('/candidatos', candidatoRoutes);
app.use('/miembros-mesa', miembroMesaRoutes);
app.use('/agentes', agentePolicialRoutes);
app.use('/partidos', partidoRoutes);
app.use('/formulas', formulaRoutes);
app.use('/senados', senadoRoutes);
app.use('/papeletas', papeletaRoutes);
app.use('/listas', listaRoutes);
app.use('/votos', votoRoutes);
app.use('/voto-lista', votoListaRoutes);
app.use('/voto-papeleta', votoPapeletaRoutes);
app.use('/persona-vota', personaVotaRoutes);
app.use('/lista-apoya', listaApoyaRoutes);
app.use('/candidato-lista', candidatoListaRoutes);
app.use('/resultados', resultadosRoutes);



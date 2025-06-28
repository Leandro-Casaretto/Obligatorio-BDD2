const express = require('express');
const db = require('./db');
require('dotenv').config();

const personaRoutes = require('./routes/persona.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

app.use('/personas', personaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});

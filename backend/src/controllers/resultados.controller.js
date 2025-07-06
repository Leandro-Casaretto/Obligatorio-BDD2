const resultadosService = require('../services/resultados.service');

const resultadosPorLista = async (req, res) => {
  try {
    const id_circuito = req.params.id;
    const resultados = await resultadosService.getResultadosPorLista(id_circuito);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener resultados por circuito', detalles: err });
  }
};

const resultadosPorPartido = async (req, res) => {
  try {
    const id_circuito = req.params.id;
    const resultados = await resultadosService.getResultadosPorPartido(id_circuito);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener resultados por partido', detalles: err });
  }
};

const resultadosPorCandidato = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const resultados = await resultadosService.getResultadosPorCandidato(id);
    res.json(resultados);
  } catch (error) {
    console.error('Error en resultadosPorCandidato:', error);
    res.status(500).json({ error: 'Error al obtener resultados por candidato' });
  }
};

// ------------------------------------------POR DPTO --------------------------------------------

const resultadosPorListaDepartamento = async (req, res) => {
  const { id } = req.params;
  try {
    const resultados = await resultadosService.getResultadosPorListaDepartamento(id);
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los resultados por departamento' });
  }
};

const resultadosPorPartidoDepartamento = async (req, res) => {
  const { id } = req.params;
  try {
    const resultados = await resultadosService.getResultadosPorPartidoDepartamento(id);
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los resultados por partido (departamento)' });
  }
};

const resultadosPorCandidatoDepartamento = async (req, res) => {
  const { id } = req.params;
  try {
    const resultados = await resultadosService.getResultadosPorCandidatoDepartamento(id);
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los resultados por candidato (departamento)' });
  }
};

const candidatoGanadorPorDepartamento = async (req, res) => {
  try {
    const resultados = await resultadosService.getCandidatoGanadorPorDepartamento();
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el candidato ganador por departamento' });
  }
};


module.exports = {
  resultadosPorLista,
  resultadosPorPartido,
  resultadosPorCandidato,
  resultadosPorListaDepartamento,
  resultadosPorPartidoDepartamento,
  resultadosPorCandidatoDepartamento,
  candidatoGanadorPorDepartamento
};

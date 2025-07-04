const resultadosModel = require('../models/resultados.model');

const getResultadosPorLista = async (id_circuito) => {
  const [resultados, total] = await Promise.all([
    new Promise((resolve, reject) => {
      resultadosModel.getResultadosPorLista(id_circuito, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    new Promise((resolve, reject) => {
      resultadosModel.getTotalVotosPorCircuito(id_circuito, (err, res) => {
        if (err) reject(err);
        else resolve(res[0].total);
      });
    })
  ]);

  return resultados.map(r => ({
    lista: r.lista,
    partido: r.partido,
    cantidad_votos: r.cantidad_votos,
    porcentaje: total ? ((r.cantidad_votos / total) * 100).toFixed(2) + '%' : '0%'
  }));
};

const getResultadosPorPartido = async (id_circuito) => {
  const [resultados, total] = await Promise.all([
    new Promise((resolve, reject) => {
      resultadosModel.getResultadosPorPartido(id_circuito, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    new Promise((resolve, reject) => {
      resultadosModel.getTotalVotosPorCircuito(id_circuito, (err, res) => {
        if (err) reject(err);
        else resolve(res[0].total);
      });
    })
  ]);

  return resultados.map(r => ({
    partido: r.partido,
    cantidad_votos: r.cantidad_votos,
    porcentaje: total ? ((r.cantidad_votos / total) * 100).toFixed(2) + '%' : '0%'
  }));
};

const getResultadosPorCandidato = async (id_circuito) => {
  const [resultados, total] = await Promise.all([
    new Promise((resolve, reject) => {
      resultadosModel.getResultadosPorCandidato(id_circuito, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    new Promise((resolve, reject) => {
      resultadosModel.getTotalVotosPorCircuito(id_circuito, (err, res) => {
        if (err) reject(err);
        else resolve(res[0].total);
      });
    })
  ]);

  return resultados.map(r => ({
    partido: r.partido,
    candidato: r.candidato,
    cantidad_votos: r.cantidad_votos,
    porcentaje: total ? ((r.cantidad_votos / total) * 100).toFixed(2) + '%' : '0%'
  }));
};

//--------------------------------------------- POR DPTO --------------------------------------------

const getResultadosPorListaDepartamento = async (id_departamento) => {
  const [resultados, total] = await Promise.all([
    new Promise((resolve, reject) => {
      resultadosModel.getResultadosPorListaDepartamento(id_departamento, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    new Promise((resolve, reject) => {
      resultadosModel.getTotalVotosPorDepartamento(id_departamento, (err, res) => {
        if (err) reject(err);
        else resolve(res[0].total);
      });
    })
  ]);

  return resultados.map(r => ({
    lista: r.lista,
    partido: r.partido,
    cantidad_votos: r.cantidad_votos,
    porcentaje: total ? ((r.cantidad_votos / total) * 100).toFixed(2) + '%' : '0%'
  }));
};

module.exports = {
  getResultadosPorListaDepartamento
};


const getResultadosPorPartidoDepartamento = async (id_departamento) => {
  const [resultados, total] = await Promise.all([
    new Promise((resolve, reject) => {
      resultadosModel.getResultadosPorPartidoDepartamento(id_departamento, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    new Promise((resolve, reject) => {
      resultadosModel.getTotalVotosPorDepartamento(id_departamento, (err, res) => {
        if (err) reject(err);
        else resolve(res[0].total);
      });
    })
  ]);

  return resultados.map(r => ({
    partido: r.partido,
    cantidad_votos: r.cantidad_votos,
    porcentaje: total ? ((r.cantidad_votos / total) * 100).toFixed(2) + '%' : '0%'
  }));
};

const getResultadosPorCandidatoDepartamento = async (id_departamento) => {
  const [resultados, total] = await Promise.all([
    new Promise((resolve, reject) => {
      resultadosModel.getResultadosPorCandidatoDepartamento(id_departamento, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    new Promise((resolve, reject) => {
      resultadosModel.getTotalVotosPorDepartamento(id_departamento, (err, res) => {
        if (err) reject(err);
        else resolve(res[0].total);
      });
    })
  ]);

  return resultados.map(r => ({
    partido: r.partido,
    candidato: r.candidato,
    cantidad_votos: r.cantidad_votos,
    porcentaje: total ? ((r.cantidad_votos / total) * 100).toFixed(2) + '%' : '0%'
  }));
};


const getCandidatoGanadorPorDepartamento = () => {
  return new Promise((resolve, reject) => {
    resultadosModel.getCandidatoGanadorPorDepartamento((err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};


const getTotalVotosPorDepartamento = async (id_departamento) => {
  return new Promise((resolve, reject) => {
    resultadosModel.getTotalVotosPorDepartamento(id_departamento, (err, res) => {
      if (err) reject(err);
      else resolve(res[0].total);
    });
  });
};

module.exports = {
  getResultadosPorLista,
  getResultadosPorPartido,
  getResultadosPorCandidato,
  getResultadosPorListaDepartamento,
  getTotalVotosPorDepartamento, 
  getResultadosPorPartidoDepartamento,
  getResultadosPorCandidatoDepartamento,
  getCandidatoGanadorPorDepartamento
};

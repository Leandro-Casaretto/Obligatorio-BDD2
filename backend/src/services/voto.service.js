const votoModel = require('../models/voto.model');
const votoListaService = require('./votoLista.service');
const personaVotaService = require('./personaVota.service');
const personaVotaModel = require('../models/personaVota.model');
const mesaModel = require('../models/mesa.model');

const crearVoto = (voto) => {
  return new Promise((resolve, reject) => {
    votoModel.createVoto(voto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerTodosLosVotos = () => {
  return new Promise((resolve, reject) => {
    votoModel.getAllVotos((err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const obtenerVotoPorId = (id) => {
  return new Promise((resolve, reject) => {
    votoModel.getVotoById(id, (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

// Nuevo: registrar voto completo
const registrarVotoCompleto = async ({ ci, id_eleccion, id_circuito, tipo_voto, id_lista, es_observado }) => {
  // 0. Verificar si ya votó
  const registros = await new Promise((resolve, reject) => {
    personaVotaModel.verificarSiYaVoto(ci, id_eleccion, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
  if (registros.length === 0) {
    throw new Error('No tienes asignación para votar en esta elección.');
  }
  if (registros[0].fecha) {
    throw new Error('Ya has votado en esta elección.');
  }

  // 0.5. Verificar que la mesa esté abierta
  const mesa = await new Promise((resolve, reject) => {
    mesaModel.getMesaByCircuito(id_circuito, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
  if (!mesa) {
    throw new Error('No se encontró la mesa asociada a este circuito.');
  }
  if (mesa.estado !== 'abierta') {
    throw new Error('No se puede votar porque la mesa está cerrada.');
  }

  // 1. Insertar voto
  const estado = tipo_voto === 'anulado' ? 'anulado' : 'válido';
  const votoData = {
    estado,
    es_observado,
    id_circuito,
    id_eleccion
  };
  const votoResult = await new Promise((resolve, reject) => {
    votoModel.createVoto(votoData, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
  const id_voto = votoResult.insertId;

  // 2. Asociar a lista si aplica
  if (tipo_voto === 'valido' && id_lista) {
    await votoListaService.agregarVotoALista(id_voto, id_lista);
  }

  // 3. Actualizar en persona_vota (setear fecha y es_observado)
  await personaVotaService.actualizarRegistroVotoPersona({
    ci,
    id_eleccion,
    fecha: new Date(),
    es_observado
  });

  return { mensaje: 'voto registrado exitosamente' };
};

module.exports = {
  crearVoto,
  obtenerTodosLosVotos,
  obtenerVotoPorId,
  registrarVotoCompleto
};

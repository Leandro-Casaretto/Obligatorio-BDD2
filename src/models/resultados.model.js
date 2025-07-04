const db = require('../db');


const getResultadosPorLista = (id_circuito, callback) => {
  const sql = `
    SELECT 
      COALESCE(L.numero_lista, 'En Blanco') AS lista,
      COALESCE(P.nombre, 'En Blanco') AS partido,
      COUNT(V.id_voto) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    LEFT JOIN Lista L ON VL.id_lista = L.id_lista
    LEFT JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    LEFT JOIN Partido P ON LA.id_partido = P.id_partido
    WHERE V.id_circuito = ? AND V.estado = 'válido'
    GROUP BY lista, partido

    UNION

    SELECT 
      'En Blanco' AS lista,
      'En Blanco' AS partido,
      COUNT(*) AS cantidad_votos
    FROM Voto
    WHERE id_circuito = ? AND estado = 'válido' AND id_voto NOT IN (SELECT id_voto FROM Voto_Lista)

    UNION

    SELECT 
      'Anulado' AS lista,
      'Anulado' AS partido,
      COUNT(*) AS cantidad_votos
    FROM Voto
    WHERE id_circuito = ? AND estado = 'anulado'
    ORDER BY cantidad_votos DESC 
  `;
  db.query(sql, [id_circuito, id_circuito, id_circuito], callback);
};

const getResultadosPorPartido = (id_circuito, callback) => {
  const sql = `
    SELECT 
      COALESCE(P.nombre, 'En Blanco') AS partido,
      COUNT(*) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    LEFT JOIN Lista L ON VL.id_lista = L.id_lista
    LEFT JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    LEFT JOIN Partido P ON LA.id_partido = P.id_partido
    WHERE V.id_circuito = ? AND V.estado = 'válido'
    GROUP BY partido

    UNION

    SELECT 'En Blanco' AS partido, COUNT(*) 
    FROM Voto 
    WHERE id_circuito = ? AND estado = 'válido' AND id_voto NOT IN (SELECT id_voto FROM Voto_Lista)

    UNION

    SELECT 'Anulado' AS partido, COUNT(*) 
    FROM Voto 
    WHERE id_circuito = ? AND estado = 'anulado'
    ORDER BY cantidad_votos DESC
  `;
  db.query(sql, [id_circuito, id_circuito, id_circuito], callback);
};

const getResultadosPorCandidato = (id_circuito, callback) => {
  const sql = `
    SELECT 
      COALESCE(PA.nombre, 'En Blanco') AS partido,
      COALESCE(PER.nombre, 'En Blanco') AS candidato,
      COUNT(V.id_voto) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    LEFT JOIN Lista L ON VL.id_lista = L.id_lista
    LEFT JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    LEFT JOIN Partido PA ON LA.id_partido = PA.id_partido
    LEFT JOIN FormulaPresidencial FP ON LA.id_formula = FP.id_formula
    LEFT JOIN Persona PER ON FP.ci_presidente = PER.ci
    WHERE V.id_circuito = ? AND V.estado = 'válido'
    GROUP BY partido, candidato

    UNION

    SELECT 'En Blanco', 'En Blanco', COUNT(*) 
    FROM Voto 
    WHERE id_circuito = ? AND estado = 'válido' AND id_voto NOT IN (SELECT id_voto FROM Voto_Lista)

    UNION

    SELECT 'Anulado', 'Anulado', COUNT(*) 
    FROM Voto 
    WHERE id_circuito = ? AND estado = 'anulado'
  `;
  db.query(sql, [id_circuito, id_circuito, id_circuito], callback);
};


const getTotalVotosPorCircuito = (id_circuito, callback) => {
  const sql = `SELECT COUNT(*) AS total FROM Voto WHERE id_circuito = ?`;
  db.query(sql, [id_circuito], callback);
};

// -------------------------------------------------- POR DPTO--------------------------------------------

const getResultadosPorListaDepartamento = (id_departamento, callback) => {
  const sql = `
    SELECT 
      COALESCE(L.numero_lista, 'En Blanco') AS lista,
      COALESCE(P.nombre, 'En Blanco') AS partido,
      COUNT(V.id_voto) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    LEFT JOIN Lista L ON VL.id_lista = L.id_lista
    LEFT JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    LEFT JOIN Partido P ON LA.id_partido = P.id_partido
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'válido' AND E.id_departamento = ?
    GROUP BY lista, partido

    UNION

    SELECT 
      'En Blanco' AS lista,
      'En Blanco' AS partido,
      COUNT(*) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'válido'
      AND id_voto NOT IN (SELECT id_voto FROM Voto_Lista)
      AND E.id_departamento = ?

    UNION

    SELECT 
      'Anulado' AS lista,
      'Anulado' AS partido,
      COUNT(*) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'anulado' AND E.id_departamento = ?
  `;
  db.query(sql, [id_departamento, id_departamento, id_departamento], callback);
};

// Resultados por partido en un departamento
const getResultadosPorPartidoDepartamento = (id_departamento, callback) => {
  const sql = `
    SELECT 
      COALESCE(P.nombre, 'En Blanco') AS partido,
      COUNT(*) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    LEFT JOIN Lista L ON VL.id_lista = L.id_lista
    LEFT JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    LEFT JOIN Partido P ON LA.id_partido = P.id_partido
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'válido' AND E.id_departamento = ?
    GROUP BY partido

    UNION

    SELECT 'En Blanco', COUNT(*) 
    FROM Voto V
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'válido' 
      AND id_voto NOT IN (SELECT id_voto FROM Voto_Lista)
      AND E.id_departamento = ?

    UNION

    SELECT 'Anulado', COUNT(*) 
    FROM Voto V
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'anulado' AND E.id_departamento = ?
  `;
  db.query(sql, [id_departamento, id_departamento, id_departamento], callback);
};

// Resultados por candidato en un departamento
const getResultadosPorCandidatoDepartamento = (id_departamento, callback) => {
  const sql = `
    SELECT 
      COALESCE(P.nombre, 'En Blanco') AS partido,
      COALESCE(PE.nombre, 'En Blanco') AS candidato,
      COUNT(V.id_voto) AS cantidad_votos
    FROM Voto V
    LEFT JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    LEFT JOIN Lista L ON VL.id_lista = L.id_lista
    LEFT JOIN Candidato_Lista CL ON L.id_lista = CL.id_lista AND CL.organo = 'presidente' AND CL.orden = 1
    LEFT JOIN Candidato C ON CL.ci = C.ci
    LEFT JOIN Persona PE ON C.ci = PE.ci
    LEFT JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    LEFT JOIN Partido P ON LA.id_partido = P.id_partido
    LEFT JOIN Circuito CI ON V.id_circuito = CI.id_circuito
    LEFT JOIN Establecimiento E ON CI.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'válido' AND E.id_departamento = ?
    GROUP BY partido, candidato

    UNION

    SELECT 
      'En Blanco', 'En Blanco', COUNT(*) 
    FROM Voto V
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'válido' 
      AND id_voto NOT IN (SELECT id_voto FROM Voto_Lista)
      AND E.id_departamento = ?

    UNION

    SELECT 
      'Anulado', 'Anulado', COUNT(*) 
    FROM Voto V
    LEFT JOIN Circuito C ON V.id_circuito = C.id_circuito
    LEFT JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE V.estado = 'anulado' AND E.id_departamento = ?
  `;
  db.query(sql, [id_departamento, id_departamento, id_departamento], callback);
};

const getCandidatoGanadorPorDepartamento = (callback) => {
  const sql = `
    SELECT 
      D.nombre AS departamento,
      P.nombre AS partido,
      PE.nombre AS presidente,
      COUNT(V.id_voto) AS cantidad_votos
    FROM Voto V
    JOIN Circuito C ON V.id_circuito = C.id_circuito
    JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    JOIN Departamento D ON E.id_departamento = D.id_departamento
    JOIN Voto_Lista VL ON V.id_voto = VL.id_voto
    JOIN Lista L ON VL.id_lista = L.id_lista
    JOIN Lista_Apoya LA ON L.id_lista = LA.id_lista
    JOIN FormulaPresidencial FP ON LA.id_formula = FP.id_formula
    JOIN Persona PE ON FP.ci_presidente = PE.ci
    JOIN Partido P ON FP.id_partido = P.id_partido
    WHERE V.estado = 'válido'
    GROUP BY D.id_departamento, FP.id_formula
    HAVING COUNT(V.id_voto) >= ALL (
      SELECT COUNT(V2.id_voto)
      FROM Voto V2
      JOIN Circuito C2 ON V2.id_circuito = C2.id_circuito
      JOIN Establecimiento E2 ON C2.id_establecimiento = E2.id_establecimiento
      JOIN Voto_Lista VL2 ON V2.id_voto = VL2.id_voto
      JOIN Lista L2 ON VL2.id_lista = L2.id_lista
      JOIN Lista_Apoya LA2 ON L2.id_lista = LA2.id_lista
      WHERE V2.estado = 'válido'
        AND E2.id_departamento = D.id_departamento
      GROUP BY LA2.id_formula
    )
  `;
  db.query(sql, callback);
};

const getTotalVotosPorDepartamento = (id_departamento, callback) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM Voto V
    JOIN Circuito C ON V.id_circuito = C.id_circuito
    JOIN Establecimiento E ON C.id_establecimiento = E.id_establecimiento
    WHERE E.id_departamento = ?
  `;
  db.query(sql, [id_departamento], callback);
};

module.exports = {
  getResultadosPorLista,
  getResultadosPorPartido,
  getTotalVotosPorCircuito,
  getResultadosPorCandidato,
  getResultadosPorListaDepartamento,
  getTotalVotosPorDepartamento,
  getResultadosPorPartidoDepartamento,
  getResultadosPorCandidatoDepartamento,
  getCandidatoGanadorPorDepartamento,
};

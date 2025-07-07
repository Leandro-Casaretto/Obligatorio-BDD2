SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE persona_vota;
TRUNCATE TABLE voto_lista;
TRUNCATE TABLE voto;
TRUNCATE TABLE candidato_lista;
TRUNCATE TABLE lista_apoya;
TRUNCATE TABLE lista;
TRUNCATE TABLE candidato;
TRUNCATE TABLE formulapresidencial;
TRUNCATE TABLE senado;
TRUNCATE TABLE partido;
TRUNCATE TABLE miembromesa;
TRUNCATE TABLE agentepolicial;
TRUNCATE TABLE persona;
TRUNCATE TABLE mesa;
TRUNCATE TABLE circuito;
TRUNCATE TABLE eleccion;
TRUNCATE TABLE establecimiento;
TRUNCATE TABLE departamento;


ALTER TABLE lista AUTO_INCREMENT = 1;
ALTER TABLE voto AUTO_INCREMENT = 1;
ALTER TABLE candidato AUTO_INCREMENT = 1;
ALTER TABLE partido AUTO_INCREMENT = 1;
ALTER TABLE senado AUTO_INCREMENT = 1;
ALTER TABLE formulapresidencial AUTO_INCREMENT = 1;
ALTER TABLE lista_apoya AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

USE FV_Grupo6;

-- Departamentos
INSERT INTO departamento (nombre) VALUES
('Montevideo'),
('Canelones'),
('Maldonado');

-- Establecimientos
INSERT INTO establecimiento (direccion, tipo, zona, id_departamento) VALUES
('Av. 18 de Julio 1234', 'Liceo', 'Centro', 1),
('Pocitos', 'Liceo', 'Centro', 1),
('Av Italia', 'Liceo', 'Centro', 1),
('Santa Rosa', 'Liceo', 'Centro', 2),
('IUA', 'Escuela', 'Rural', 3),
('Liceo Punta del Este', 'Escuela', 'Rural', 3),
('Intendencia', 'Escuela', 'Rural', 3),
('BPS', 'Escuela', 'Rural', 3),
('Club Punta del Este', 'Club', 'Punta del Este', 3);

-- Elección
INSERT INTO eleccion (fecha, tipo, descripcion) VALUES
('2025-10-25', 'Nacional', 'Elección nacional 2025');

-- Circuitos
INSERT INTO circuito (numero_circuito, cant_votos, es_accesible, municipio, id_establecimiento, id_eleccion) VALUES
(50, 0, TRUE, 'Municipio A', 1, 1),
(51, 0, FALSE, 'Municipio B', 1, 1),
(52, 0, TRUE, 'Municipio C', 1, 1),

(600, 0, TRUE, 'Municipio C', 4, 1),

(100, 0, TRUE, 'Maldonado', 5, 1),
(101, 0, FALSE, 'Punta', 6, 1),
(102, 0, TRUE, 'Municipio C', 7, 1),
(103, 0, FALSE, 'Piriapolis', 8, 1),
(104, 0, FALSE, 'San Carlos', 9, 1);

-- Mesas
INSERT INTO mesa (numero_mesa, estado, cant_votos, id_circuito) VALUES
(1, 'abierta', 0, 1),
(2, 'abierta', 0, 2),
(3, 'abierta', 0, 3),

(3, 'abierta', 0, 4),

(1, 'abierta', 0, 5),
(2, 'abierta', 0, 6),
(3, 'abierta', 0, 7),
(4, 'abierta', 0, 8),
(5, 'abierta', 0, 9);

-- Personas
INSERT INTO persona (ci, cc, nombre, apellido) VALUES
(10000001, 'DAB1', 'Luis', 'Suárez'),
(10000002, 'DAB2', 'Ana', 'Gómez'),
(10000003, 'DAB3', 'Carlos', 'Rodríguez'),
(10000004, 'DAB4', 'Laura', 'Martínez'),
(10000005, 'DAB5', 'Alvaro', 'Delgado'),
(10000006, 'DAB6', 'Sofía', 'Pérez'),
(10000007, 'DAB7', 'Yamandu', 'Orsi'),
(10000008, 'DAB8', 'Lucía', 'Torres'),
(10000009, 'DAB9', 'Andres', 'Ojeda'),
(10000010, 'DAB10', 'Fernando', 'Castro'),
(10000011, 'DAB11', 'Carlos', 'Perez'),
(10000012, 'DAB12', 'Juan', 'Mendez'),
(10000013, 'DAB13', 'Leonardo', 'Rodriguez'),
(10000014, 'DAB14', 'Maximiliano', 'Gimenez'),
(10000015, 'DAB15', 'Jose', 'Acosta'),
(10000016, 'DAB16', 'Fernando', 'Perez'),
(10000017, 'DAB17', 'Ignacio', 'Moreira'),
(10000018, 'DAB18', 'Leandro', 'Casaretto'),
(10000019, 'DAB19', 'Nicolas', 'Gonzalez'),
(10000020, 'DAB20', 'Pedro', 'Perez');

-- Agente Policial
INSERT INTO agentepolicial (ci, comisaria, id_establecimiento) VALUES
(10000001, 'Comisaría 1', 1);

-- Miembros de mesa
INSERT INTO miembromesa (ci, organismo, rol, id_mesa) VALUES
(10000002, 'Corte Electoral', 'Presidente', 1),
(10000003, 'Corte Electoral', 'Secretario', 2),
(10000004, 'Corte Electoral', 'Vocal', 3);

-- Partidos
INSERT INTO partido (nombre, presidente, vicepresidente, direccion_sede) VALUES
('Partido Nacional', 'Luis', 'Laura', 'Sede 1'),
('Frente Amplio', 'Ana', 'Pedro', 'Sede 2'),
('Partido Colorado', 'Jorge', 'Sofía', 'Sede 3');

-- senado
INSERT INTO senado (nombre, id_partido) VALUES
('Aire Fresco', 1),
('MPP', 2),
('Arriba Uruguay', 3);

-- Fórmula presidencial
INSERT INTO formulapresidencial (ci_presidente, ci_vicepresidente, id_partido) VALUES
(10000005, 10000006, 1),
(10000007, 10000008, 2),
(10000009, 10000012, 3);

-- Candidatos
INSERT INTO candidato (ci) VALUES
(10000005), (10000006),
(10000007), (10000008),
(10000009), (10000012);

-- Listas
INSERT INTO lista (numero_lista, id_eleccion, id_departamento) VALUES
(23, 1, 3),
(20, 1, 3),
(72, 1, 3),
(609, 1, 3),
(10, 1, 3),
(2001, 1, 3),

(404, 1, 1),
(6099, 1, 1),
(1010, 1, 1),

(71, 1, 2),
(6009, 1, 2),
(6969, 1, 2);

-- Asociación lista_apoya
INSERT INTO lista_apoya (id_lista, id_partido, id_senado, id_formula) VALUES
(1, 1, 1, 1),
(2, 1, 1, 1),
(3, 1, 1, 1),
(4, 2, 2, 2),
(5, 3, 3, 3),
(6, 2, 2, 2),

(7, 1, 1, 1),
(8, 2, 2, 2),
(9, 3, 3, 3),

(10, 1, 1, 1),
(11, 2, 2, 2),
(12, 2, 2, 2);

-- Asociación candidato_lista
INSERT INTO candidato_lista (ci, id_lista, organo, orden) VALUES
(10000005, 1, 'Presidente', 1),
(10000006, 1, 'Vicepresidente', 2),
(10000005, 2, 'Presidente', 1),
(10000006, 2, 'Vicepresidente', 2),
(10000007, 3, 'Presidente', 1),
(10000008, 3, 'Vicepresidente', 2),
(10000007, 4, 'Presidente', 1),
(10000008, 4, 'Vicepresidente', 2),
(10000009, 5, 'Presidente', 1),
(10000010, 5, 'Vicepresidente', 2),
(10000009, 6, 'Presidente', 1),
(10000010, 6, 'Vicepresidente', 2);

/*-- Votos (válidos, en blanco y anulados)
INSERT INTO voto (estado, es_observado, id_circuito, id_eleccion) VALUES
-- válidos para listas
('válido', FALSE, 5, 1), -- id 1
('válido', FALSE, 5, 1), -- id 2
('válido', FALSE, 5, 1), -- id 3
('válido', FALSE, 6, 1), -- id 4
('válido', FALSE, 6, 1), -- id 5
('válido', FALSE, 6, 1), -- id 6
('válido', FALSE, 7, 1), -- id 7
('válido', FALSE, 7, 1), -- id 8
('válido', FALSE, 7, 1), -- id 9
('válido', FALSE, 7, 1), -- id 10
('válido', FALSE, 7, 1), -- id 11
('válido', FALSE, 7, 1), -- id 12
('válido', FALSE, 7, 1), -- id 13
('válido', FALSE, 7, 1), -- id 14
('válido', FALSE, 7, 1), -- id 15
('válido', FALSE, 7, 1), -- id 16

('válido', FALSE, 1, 1), -- id 17
('válido', FALSE, 1, 1), -- id 18
('válido', FALSE, 1, 1), -- id 19
('válido', FALSE, 1, 1), -- id 20
('válido', FALSE, 2, 1), -- id 21
('válido', FALSE, 2, 1), -- id 22

-- en blanco
('válido', FALSE, 1, 1), -- id 7
('válido', FALSE, 1, 1), -- id 8
-- anulados
('anulado', FALSE, 1, 1), -- id 9
('anulado', FALSE, 1, 1); -- id 10
*/
-- voto_lista
/*INSERT INTO voto_lista (id_voto, id_lista) VALUES
(1, 1),
(2, 4),
(3, 1),
(4, 1),
(5, 4),
(6, 2),
(7, 1),
(8, 1),
(9, 1),
(10, 2),
(11, 2),
(12, 4),
(13, 4),
(14, 1),
(15, 2),
(16, 1),

(17, 7),
(18, 7),
(19, 8),
(20, 8),
(21, 8),
(22, 8);*/

-- persona_vota

INSERT INTO persona_vota (ci, id_circuito, id_eleccion, fecha, es_observado) VALUES
(10000001, 1, 1, null, FALSE),
(10000002, 1, 1, null, FALSE),
(10000003, 1, 1, null, FALSE),
(10000004, 1, 1, null, FALSE),
(10000005, 1, 1, null, FALSE),
(10000006, 2, 1, null, FALSE),
(10000007, 2, 1, null, FALSE),
(10000008, 2, 1, null, FALSE),
(10000009, 2, 1, null, FALSE),
(10000010, 2, 1, null, FALSE),
(10000011, 5, 1, null, FALSE),
(10000012, 5, 1, null, FALSE),
(10000013, 5, 1, null, FALSE),
(10000014, 5, 1, null, FALSE),
(10000015, 5, 1, null, FALSE),
(10000016, 6, 1, null, FALSE),
(10000017, 6, 1, null, FALSE),
(10000018, 6, 1, null, FALSE),
(10000019, 6, 1, null, FALSE),
(10000020, 6, 1, null, FALSE);
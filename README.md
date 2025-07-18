# Obligatorio Base de Datos II - Sistema de Votación - **Grupo 6** 



![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-2fba2f?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) [![Docker][Docker-img]][Docker-url] 

## Tecnologías utilizadas

- **Backend:** Node.js (Express)
- **Frontend:** React (Vite)
- **Base de datos:** MySQL 
- **Contenerización y despliegue:** Docker, Docker Compose
- **Servidor web frontend:** nginx
- **Estilos y componentes** Material UI (MUI)
- **Herramientas de prueba:** Postman

---
## Requerimientos previos



Para ejecutar este proyecto **no es necesario instalar Node.js, npm ni ninguna base de datos localmente**.  
Solo se necesita tener instalado **Docker Desktop**:

- **Windows/Mac:**  
  [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- **Linux:**  
  [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

---

## Estructura del proyecto

```
OBLIGATORIO/
│
├── backend/           # Código del backend (Node.js/Express)
│   └── .env           # Variables de entorno para conexión a la base de datos
│   └── Dockerfile
│
├── frontend/          # Código del frontend (React)
│   └── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml 
└── README.md          
```

---

## Configuración

### 1. Variables de entorno

Asegurarse de que se encuentre el archivo `.env` dentro de la carpeta `Backend` con las credenciales de la base de datos de la facultad.  


```
DB_HOST=mysql.reto-ucu.net
DB_PORT=50006
DB_USER=fv_g6_admin
DB_PASSWORD=Bd2025!
DB_NAME=FV_Grupo6
PORT=3000
```

---

## Ejecución local con Docker

1. **Clonar este repositorio**:
   ```sh
   git clone https://github.com/Leandro-Casaretto/Obligatorio-BDD2.git
   ```

2. **Levantar los servicios con Docker Compose:**
   ```sh
   docker-compose up --build
   ```
   Esto levantará:
   - El backend en [http://localhost:3000](http://localhost:3000)
   - El frontend en [http://localhost](http://localhost)

4. **Acceder a la aplicación**  

---

## Notas importantes

- El backend se conecta a la base de datos de la facultad usando las credenciales del `.env`.
- Si se cambian dependencias, volver a correr `docker-compose build` para reconstruir los contenedores.

---

## Herramientas recomendadas

- [Docker Desktop][Docker-url]
- [Postman][Postman-url] (para probar endpoints del backend)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (opcional, para ver la base de datos)

---
## Recorrido por la aplicación

### 1. Inicio de sesión

Al abrir la aplicación, se podrá ver el **panel de inicio de sesión**.  
Aquí se debe ingresar el usuario y contraseña para acceder al sistema.
> **Nota:** Ver "**Guía de pruebas**" o "**Datos predefinidos**" para saber como crear un usuario o usar uno ya creado



Si la intención es ingresar como **presidente de mesa**, se debe hacer clic en el botón correspondiente (esquina inferior derecha).

---
### 2. Pantalla de verificación de circuito

Antes de acceder a la votación, el sistema mostrará una **pantalla de verificación de circuito**:
- Aquí el usuario puede ver el circuito que le fue asignado para votar.
- Debe confirmar que el circuito mostrado es el correcto antes de continuar.
- Si el circuito no es el esperado, debe comunicarse con un responsable de mesa.

---
### 3. Pantalla de votación

Si se accede como votante, se podrá ver la **pantalla de votación**:
- Se mostrarán las listas y partidos disponibles para votar.
- Se deberá hacer click en la lista de tu preferencia para emitir tu voto.
- Si la mesa está cerrada o el usuario ya votó, aparecerá un mensaje y un botón para volver al login.

---
### 4. Panel del presidente de mesa

Si se accede como presidente de mesa, se podrá ver un **panel especial** donde se puede:
- Ver el estado de la mesa (abierta/cerrada).
- Cerrar la mesa cuando finaliza la votación.
- Acceder a la sección de resultados, tanto por circuito como por departamento (únicamente cuando se cierra).

---
### 5. Resultados

En la sección de resultados, se podrá ver:
- Resultados por circuito (listas, partidos y candidatos).
- Resultados por departamento (listas, partidos y candidatos).
- **Ganadores por departamento**: Muestra qué candidato ganó la elección en cada departamento.

---
## Datos predefinidos

En el proyecto se encuentran cargadas 20 personas, las cuales ya emitieron su voto para poder ver reflejados algunos resultados.

A su vez, se crearon 5 personas más, las cuales todavía no votaron y sirven para probar el sistema.

```sh
Credencial: DAB22
Contraseña: user22
```
```sh
Credencial: DAB23
Contraseña: user23
```
```sh
Credencial: DAB24
Contraseña: user24
```
```sh
Credencial: DAB25
Contraseña: user25
```
```sh
Credencial: DAB26
Contraseña: user26
```

Por otro lado, la base de datos ya cuenta con 5 **presidentes de mesa**, los cuales servirán para entrar al panel de presidente, cerrar las mesas y ver los resultados.
```sh
Credencial: DAB1
Contraseña: user1
```
```sh
Credencial: DAB2
Contraseña: user2
```
```sh
Credencial: DAB5
Contraseña: user5
```
```sh
Credencial: DAB6
Contraseña: user6
```
```sh
Credencial: DAB7
Contraseña: user7
```
---

## Guía de pruebas

Como alternativa a los datos de prueba, estos son los detalles y pasos a seguir para probar el sistema con datos propios.

### 1. Crear un usuario de prueba

Para crear un usuario manualmente, ejecutar el siguiente comando en la terminal:

```sh
node backend/tools/create-user.js
```
Seguir las instrucciones para ingresar los datos del nuevo usuario.

---

### 2. Registrar al votante en la base

Luego, debemos registrar al votante usando el endpoint correspondiente:
> **Nota:** Se sugiere el uso de Postman

- **Endpoint:** `POST http://localhost:3000/persona-vota/`
- **Body (JSON):** EJEMPLO
  ```json
  { 
    "ci": "12345678",
    "id_circuito": 1,
    "id_eleccion": 1,
    "fecha": null,
    "es_observado": false
  }
  ```

---

### 3. Probar el flujo de votación

1. Ingresar con el usuario creado.
3. Realizar el proceso de votación.
4. Verificar que el voto se registre correctamente y que los resultados se actualicen.

---
### 4. Asignar una persona como presidente de mesa

- **Endpoint:** `POST http://localhost:3000/miembros-mesa/`
- **Body (JSON):** EJEMPLO
  ```json
  { 
  "ci": 10000007,
  "organismo": "Corte Electoral",
  "rol": "Presidente",
  "id_mesa": 6
  }
  ```

---

### 4. Probar cierre de mesa y acceso restringido

- Ingresar como presidente de mesa.
- Cerrar la mesa desde el panel.
- Intentar votar nuevamente con un usuario: la aplicación debe impedir el voto y mostrar el mensaje correspondiente.

---

## Endpoints principales del backend

> **Nota:** Todos los endpoints están bajo la URL base del backend, por ejemplo: `http://localhost:3000/`

### Autenticación
- **POST `/auth/login`**  
  Iniciar sesión de usuario.
- **POST `/auth/registrar`**  
  Registrar un nuevo usuario.
- **POST `/auth/login-presidente`**  
  Iniciar sesión como presidente de mesa.

### Personas
- **GET `/personas`**  
  Obtener todas las personas.
- **GET `/personas/:ci`**  
  Obtener persona por CI.
- **POST `/personas`**  
  Crear persona.
- **PUT `/personas/:ci`**  
  Actualizar persona.
- **DELETE `/personas/:ci`**  
  Eliminar persona.

### Votación
- **POST `/voto`**  
  Crear voto.
- **POST `/voto/votar`**  
  Registrar voto completo.
- **GET `/voto`**  
  Obtener todos los votos.
- **GET `/voto/:id`**  
  Obtener voto por ID.

### Resultados
- **GET `/resultados/circuito/:id/por-lista`**  
  Resultados por lista en un circuito.
- **GET `/resultados/circuito/:id/por-partido`**  
  Resultados por partido en un circuito.
- **GET `/resultados/circuito/por-candidato/:id`**  
  Resultados por candidato en un circuito.
- **GET `/resultados/departamento/:id/por-lista`**  
  Resultados por lista en un departamento.
- **GET `/resultados/departamento/:id/por-partido`**  
  Resultados por partido en un departamento.
- **GET `/resultados/departamento/:id/por-candidato`**  
  Resultados por candidato en un departamento.
- **GET `/resultados/ganador-por-departamento`**  
  Obtener ganador por departamento (candidato que ganó la elección en cada departamento).

### Mesas
- **GET `/mesas`**  
  Obtener todas las mesas.
- **GET `/mesas/:id`**  
  Obtener mesa por ID.
- **POST `/mesas`**  
  Crear mesa.
- **PUT `/mesas/:id`**  
  Actualizar mesa.
- **DELETE `/mesas/:id`**  
  Eliminar mesa.
- **PATCH `/mesas/:id/cerrar`**  
  Cerrar mesa.

### Listas
- **GET `/listas`**  
  Obtener todas las listas.
- **GET `/listas/por-circuito/:id_circuito/:id_eleccion`**  
  Listas por circuito y elección.
- **GET `/listas/:id`**  
  Obtener lista por ID.
- **POST `/listas`**  
  Crear lista.
- **PUT `/listas/:id`**  
  Actualizar lista.
- **DELETE `/listas/:id`**  
  Eliminar lista.

### Partidos
- **GET `/partidos`**  
  Obtener todos los partidos.
- **GET `/partidos/:id`**  
  Obtener partido por ID.
- **POST `/partidos`**  
  Crear partido.
- **PUT `/partidos/:id`**  
  Actualizar partido.
- **DELETE `/partidos/:id`**  
  Eliminar partido.


> **Sugerencia:** Importar la colección de Postman incluida en la carpeta `postman/` para probar todos los endpoints fácilmente.

[Docker-img]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/products/docker-desktop/
[Postman-url]: https://www.postman.com/downloads/

---




const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar con MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL correctamente.');
});

module.exports = connection;

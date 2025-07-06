// test-auth.js - Script para probar la autenticación
const bcrypt = require('bcrypt');
const db = require('../src/db');

const testAuth = async () => {
  try {
    console.log('🔍 Probando sistema de autenticación...\n');

    // 1. Crear un hash de prueba
    const password = 'clave123';
    const hash = await bcrypt.hash(password, 10);
    console.log('✅ Hash generado:', hash.substring(0, 20) + '...');

    // 2. Verificar que el hash funciona
    const match = await bcrypt.compare(password, hash);
    console.log('✅ Verificación de hash:', match ? 'CORRECTO' : 'INCORRECTO');

    // 3. Verificar estructura de la tabla usuario
    const checkTable = 'DESCRIBE usuario';
    db.query(checkTable, (err, results) => {
      if (err) {
        console.log('❌ Error al verificar tabla usuario:', err.message);
        return;
      }
      console.log('✅ Estructura de tabla usuario:');
      results.forEach(row => {
        console.log(`   - ${row.Field}: ${row.Type} ${row.Null === 'YES' ? '(NULL)' : '(NOT NULL)'}`);
      });

      // 4. Verificar si hay usuarios en la tabla
      const checkUsers = 'SELECT COUNT(*) as count FROM usuario';
      db.query(checkUsers, (err, results) => {
        if (err) {
          console.log('❌ Error al contar usuarios:', err.message);
          return;
        }
        console.log(`\n📊 Usuarios en la tabla: ${results[0].count}`);

        // 5. Mostrar algunos usuarios si existen
        if (results[0].count > 0) {
          const showUsers = 'SELECT ci, cc, habilitado FROM usuario LIMIT 5';
          db.query(showUsers, (err, results) => {
            if (err) {
              console.log('❌ Error al mostrar usuarios:', err.message);
              return;
            }
            console.log('👥 Usuarios existentes:');
            results.forEach(user => {
              console.log(`   - CI: ${user.ci}, CC: ${user.cc}, Habilitado: ${user.habilitado}`);
            });
          });
        }

        // 6. Verificar relación con tabla persona
        const checkPersona = `
          SELECT COUNT(*) as count 
          FROM usuario u 
          JOIN persona p ON u.ci = p.ci
        `;
        db.query(checkPersona, (err, results) => {
          if (err) {
            console.log('❌ Error al verificar relación persona:', err.message);
            return;
          }
          console.log(`📋 Usuarios con datos de persona: ${results[0].count}`);
        });
      });
    });

  } catch (error) {
    console.error('❌ Error en test:', error);
  }
};

// Ejecutar el test
testAuth();

// Cerrar conexión después de 5 segundos
setTimeout(() => {
  db.end();
  console.log('\n🔚 Conexión cerrada');
}, 5000); 
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const bcrypt = require('bcrypt');
const db = require('../src/db');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const createUser = async () => {
  try {
    console.log('🔧 Creando nuevo usuario...\n');

   
    const ci = await question('Ingrese el CI: ');
    const cc = await question('Ingrese la credencial cívica (CC): ');
    const nombre = await question('Ingrese el nombre: ');
    const apellido = await question('Ingrese el apellido: ');
    const password = await question('Ingrese la contraseña: ');

    console.log('\n📋 Datos ingresados:');
    console.log(`   - CI: ${ci}`);
    console.log(`   - CC: ${cc}`);
    console.log(`   - Nombre: ${nombre} ${apellido}`);
    console.log(`   - Contraseña: ${password}`);

    const confirm = await question('\n¿Confirmar creación? (s/n): ');
    if (confirm.toLowerCase() !== 's') {
      console.log('❌ Operación cancelada');
      rl.close();
      return;
    }

    
    const checkPersona = 'SELECT * FROM persona WHERE ci = ?';
    db.query(checkPersona, [ci], (err, personaResults) => {
      if (err) {
        console.log('Error al verificar persona:', err.message);
        rl.close();
        return;
      }

      if (personaResults.length > 0) {
        console.log('⚠️  La persona ya existe, actualizando datos...');
        
        
        const updatePersona = 'UPDATE persona SET cc = ?, nombre = ?, apellido = ? WHERE ci = ?';
        db.query(updatePersona, [cc, nombre, apellido, ci], (err, result) => {
          if (err) {
            console.log('Error al actualizar persona:', err.message);
            rl.close();
            return;
          }
          console.log('persona actualizada correctamente');
          createOrUpdateUsuario();
        });
      } else {
        console.log('Creando nueva persona...');
        
        
        const createPersona = 'INSERT INTO persona (ci, cc, nombre, apellido) VALUES (?, ?, ?, ?)';
        db.query(createPersona, [ci, cc, nombre, apellido], (err, result) => {
          if (err) {
            console.log('Error al crear persona:', err.message);
            rl.close();
            return;
          }
          console.log('persona creada correctamente');
          createOrUpdateUsuario();
        });
      }
    });

    const createOrUpdateUsuario = () => {
     
      const checkUsuario = 'SELECT * FROM usuario WHERE cc = ?';
      db.query(checkUsuario, [cc], (err, usuarioResults) => {
        if (err) {
          console.log('Error al verificar usuario:', err.message);
          rl.close();
          return;
        }

        if (usuarioResults.length > 0) {
          console.log('El usuario ya existe, actualizando contraseña...');
          
          // Actualizar contraseña
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.log('Error al hashear contraseña:', err.message);
              rl.close();
              return;
            }

            const updateUsuario = 'UPDATE usuario SET password = ? WHERE cc = ?';
            db.query(updateUsuario, [hash, cc], (err, result) => {
              if (err) {
                console.log('Error al actualizar usuario:', err.message);
                rl.close();
                return;
              }
              console.log('Contraseña actualizada correctamente');
              showSuccess();
            });
          });
        } else {
          console.log('Creando nuevo usuario...');
          
          // Crear usuario
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.log('Error al hashear contraseña:', err.message);
              rl.close();
              return;
            }

            const createUsuario = 'INSERT INTO usuario (ci, cc, password, habilitado) VALUES (?, ?, ?, TRUE)';
            db.query(createUsuario, [ci, cc, hash], (err, result) => {
              if (err) {
                console.log('Error al crear usuario:', err.message);
                rl.close();
                return;
              }
              console.log('usuario creado correctamente');
              showSuccess();
            });
          });
        }
      });
    };

    const showSuccess = () => {
      console.log('\n ¡usuario creado/actualizado exitosamente!');
      console.log('\n Credenciales para login:');
      console.log(`   - CC: ${cc}`);
      console.log(`   - Contraseña: ${password}`);
      console.log('\n Puedes usar estas credenciales para hacer login');
      
      
      const verifySql = `
        SELECT u.*, p.nombre, p.apellido
        FROM usuario u
        JOIN persona p ON u.ci = p.ci
        WHERE u.cc = ? AND u.habilitado = TRUE
      `;
      
      db.query(verifySql, [cc], async (err, results) => {
        if (err) {
          console.log('Error al verificar usuario:', err.message);
        } else if (results.length > 0) {
          const usuario = results[0];
          const match = await bcrypt.compare(password, usuario.password);
          console.log(`Verificación de login: ${match ? 'FUNCIONA' : 'NO FUNCIONA'}`);
        }
        
        rl.close();
        db.end();
      });
    };

  } catch (error) {
    console.error('Error:', error);
    rl.close();
    db.end();
  }
};


createUser(); 
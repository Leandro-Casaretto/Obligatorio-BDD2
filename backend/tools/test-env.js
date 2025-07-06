const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('🔍 Verificando variables de entorno...\n');

console.log('DB_HOST:', process.env.DB_HOST || 'NO DEFINIDO');
console.log('DB_PORT:', process.env.DB_PORT || 'NO DEFINIDO');
console.log('DB_USER:', process.env.DB_USER || 'NO DEFINIDO');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'DEFINIDO' : 'NO DEFINIDO');
console.log('DB_NAME:', process.env.DB_NAME || 'NO DEFINIDO');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'DEFINIDO' : 'NO DEFINIDO');

console.log('\n📁 Directorio actual:', process.cwd());
console.log('📁 Archivo .env buscado en:', path.join(__dirname, '..', '.env')); 
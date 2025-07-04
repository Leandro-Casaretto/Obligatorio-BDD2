
const bcrypt = require('bcrypt');

const password = 'estasi';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash generado:', hash);
});

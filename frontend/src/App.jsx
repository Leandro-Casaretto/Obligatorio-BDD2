import { useState } from 'react';
import LoginScreen from './components/LoginScreen';

function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLoginSuccess = (usuario) => {
    setUsuario(usuario);
  };

  return (
    <div>
      {!usuario ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <h2>Bienvenido, {usuario.cc}</h2>
      )}
    </div>
  );
}

export default App;

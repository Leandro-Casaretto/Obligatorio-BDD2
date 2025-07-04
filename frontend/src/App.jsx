import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import CircuitoScreen from './components/CircuitoScreen';

function App() {
  const { usuario } = useAuth();
  const [pantalla, setPantalla] = useState('seleccion-circuito');

  if (!usuario) return <LoginScreen />;

  if (pantalla === 'seleccion-circuito') {
    return (
      <CircuitoScreen
        onContinuar={() => setPantalla('votacion')}
        onVolver={() => setPantalla('login')}
      />
    );
  }

  if (pantalla === 'votacion') {
    return <h2>Pantalla de votación</h2>;
  }

  return null;
}

export default App;

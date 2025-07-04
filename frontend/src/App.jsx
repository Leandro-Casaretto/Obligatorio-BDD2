import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import CircuitoScreen from './components/CircuitoScreen';
import VotacionScreen from './components/VotacionScreen';

function App() {
  const { usuario } = useAuth();
  const [pantalla, setPantalla] = useState('seleccion-circuito');
  const [idCircuito, setIdCircuito] = useState(null);

  if (!usuario) return <LoginScreen />;

  if (pantalla === 'seleccion-circuito') {
    return (
      <CircuitoScreen
        onContinuar={(id_circuito) => {
          setIdCircuito(id_circuito);
          setPantalla('votacion');
        }}
        onVolver={() => setPantalla('login')}
      />
    );
  }

  if (pantalla === 'votacion') {
    return (
      <VotacionScreen
        idCircuito={idCircuito}
        idEleccion={1}
        onVotar={() => setPantalla('final')}
        onVolver={() => setPantalla('seleccion-circuito')}
      />
    );
  }

  if (pantalla === 'final') {
    return <h2>¡Gracias por votar!</h2>;
  }

  return null;
}

export default App;

import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import CircuitoScreen from './components/CircuitoScreen';
import VotacionScreen from './components/VotacionScreen';
import ThankYouScreen from './components/ThankYouScreen';

function App() {
  const { usuario, logout } = useAuth();
  const [pantalla, setPantalla] = useState('seleccion-circuito');
  const [idCircuito, setIdCircuito] = useState(null);

  // Función para resetear el estado cuando vuelve al login
  const resetearEstado = () => {
    setPantalla('seleccion-circuito');
    setIdCircuito(null);
    logout(); // Cerrar sesión del usuario actual
  };

  if (!usuario) return <LoginScreen />;

  if (pantalla === 'seleccion-circuito') {
    return (
      <CircuitoScreen
        onContinuar={(id_circuito) => {
          setIdCircuito(id_circuito);
          setPantalla('votacion');
        }}
        onVolver={resetearEstado}
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
    return (
      <ThankYouScreen 
        onVolverALogin={resetearEstado}
      />
    );
  }

  return null;
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Importando as páginas da pasta Pages
import Home from './Pages/Home';
import Agendar from './Pages/Agendar';
import Agenda from './Pages/Agenda';
import Clientes from './Pages/Clientes';
import Profissionais from './Pages/Profissionais';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      {/* O Header fica fixo no topo */}
      <Header /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/profissionais" element={<Profissionais />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
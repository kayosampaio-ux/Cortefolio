import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// IMPORTANTE: Adicione essas duas linhas abaixo
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home';
import Agendar from './Pages/Agendar';
import Agenda from './Pages/Agenda';
import Clientes from './Pages/Clientes';
import Profissionais from './Pages/Profissionais';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      {/* Container que gerencia e mostra os Toasts na tela */}
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      
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
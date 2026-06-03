import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Agendar from './Pages/Agendar';
import Agenda from './Pages/Agenda';
import Clientes from './Pages/Clientes';
import Profissionais from './Pages/Profissionais';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon">CF</div>
          <div>
            <h1>CORTEFOLIO</h1>
            <span>SEU ESTILO, NOSSA ARTE</span>
          </div>
        </div>

        <nav>
          <Link to="/">Início</Link>
          <Link to="/agendar">Agendar</Link>
          <Link to="/agenda">Agenda</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/profissionais">Profissionais</Link>
        </nav>

        <Link to="/login" className="login-btn">Login</Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/profissionais" element={<Profissionais />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
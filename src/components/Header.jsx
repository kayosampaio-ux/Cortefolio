import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>CorteFolio</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/agendar">Agendar</Link>
        <Link to="/agenda">Agenda</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/profissionais">Profissionais</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
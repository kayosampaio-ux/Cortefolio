import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      background: '#1a1a1a',
      borderBottom: '2px solid #ffb703', // Linha dourada sutil abaixo do menu
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      {/* Logo da Barbearia */}
      <Link to="/" style={{ 
        color: '#ffb703', 
        textDecoration: 'none', 
        fontSize: '24px', 
        fontWeight: 'bold',
        letterSpacing: '1px'
      }}>
        CorteFolio
      </Link>

      {/* Menu de Navegação */}
      <nav style={{ 
        display: 'flex', 
        gap: '20px'
      }}>
        <Link to="/" style={linkStyle}>Início</Link>
        <Link to="/agendar" style={linkStyle}>Agendar</Link>
        <Link to="/agenda" style={linkStyle}>Agenda</Link>
        <Link to="/clientes" style={linkStyle}>Clientes</Link>
        <Link to="/profissionais" style={linkStyle}>Profissionais</Link>
        <Link to="/login" style={{...linkStyle, color: '#ffb703', fontWeight: 'bold'}}>Login</Link>
      </nav>
    </header>
  );
}

// Estilo padrão reaproveitado para os links do menu
const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'color 0.2s',
};

export default Header;
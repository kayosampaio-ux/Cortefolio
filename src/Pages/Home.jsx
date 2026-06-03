import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png'; // Importando sua imagem de barbearia

function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '60px 20px',
      textAlign: 'center'
    }}>
      <img 
        src={heroImg} 
        alt="Logo Barbearia" 
        style={{ width: '200px', height: 'auto', marginBottom: '30px', borderRadius: '50%' }}
      />
      
      <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>Bem-vindo ao CorteFolio</h1>
      <p style={{ fontSize: '18px', color: '#aaa', maxWidth: '600px', marginBottom: '30px' }}>
        Estilo, tradição e excelência. Gerencie seus clientes, profissionais e garanta o seu horário com os melhores barbeiros da região.
      </p>

      <Link to="/agendar" style={{
        padding: '15px 30px',
        background: '#ffb703',
        color: '#000',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderRadius: '30px',
        fontSize: '18px',
        boxShadow: '0 4px 15px rgba(255, 183, 3, 0.4)'
      }}>
        Agendar um Horário
      </Link>
    </div>
  );
}

export default Home;
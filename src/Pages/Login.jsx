import React from 'react';

function Login() {
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Acesso ao Sistema</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <input type="email" placeholder="E-mail" style={{ padding: '10px' }} />
        <input type="password" placeholder="Senha" style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
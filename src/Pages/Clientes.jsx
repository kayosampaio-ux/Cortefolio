import React from 'react';
import FormCliente from '../components/FormCliente';

function Clientes() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Gestão de Clientes</h1>
      <p>Cadastre um novo cliente no sistema:</p>
      {/* Chamando o componente de formulário de cliente */}
      <FormCliente />
    </div>
  );
}

export default Clientes;
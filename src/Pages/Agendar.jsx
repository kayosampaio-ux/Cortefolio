import React from 'react';
import FormAgendamento from '../components/FormAgendamento';

function Agendar() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Novo Agendamento</h1>
      <p>Preencha os dados abaixo para reservar um horário:</p>
      {/* Chamando o componente de formulário que você já criou */}
      <FormAgendamento />
    </div>
  );
}

export default Agendar;
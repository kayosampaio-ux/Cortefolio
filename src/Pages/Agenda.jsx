import React from 'react';
import AgendamentoCard from '../components/AgendamentoCard';

function Agenda() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Visualização da Agenda</h1>
      <p>Confira os compromissos agendados:</p>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
        {/* O card de agendamento que você criou entra aqui */}
        <AgendamentoCard />
      </div>
    </div>
  );
}

export default Agenda;
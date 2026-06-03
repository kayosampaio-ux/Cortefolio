function AgendamentoCard({ agendamento }) {
  return (
    <div className="card">
      <h3>{agendamento.cliente_nome}</h3>
      <p>Serviço: {agendamento.servico_nome}</p>
      <p>Profissional: {agendamento.profissional_nome}</p>
      <p>Data: {agendamento.data_hora}</p>
      <span className="status">{agendamento.status}</span>
    </div>
  );
}

export default AgendamentoCard;
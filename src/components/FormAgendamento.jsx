import { useState } from 'react';

function FormAgendamento() {
  const [form, setForm] = useState({
    cliente: '',
    servico: '',
    profissional: '',
    data: '',
    hora: '',
    observacao: ''
  });

  function alterarCampo(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function enviarFormulario(e) {
    e.preventDefault();
    console.log('Agendamento:', form);
    alert('Agendamento cadastrado com sucesso!');
  }

  return (
    <form className="formulario" onSubmit={enviarFormulario}>
      <h2>Novo Agendamento</h2>

      <input
        type="text"
        name="cliente"
        placeholder="Nome do cliente"
        value={form.cliente}
        onChange={alterarCampo}
        required
      />

      <input
        type="text"
        name="servico"
        placeholder="Serviço"
        value={form.servico}
        onChange={alterarCampo}
        required
      />

      <input
        type="text"
        name="profissional"
        placeholder="Profissional"
        value={form.profissional}
        onChange={alterarCampo}
        required
      />

      <input
        type="date"
        name="data"
        value={form.data}
        onChange={alterarCampo}
        required
      />

      <input
        type="time"
        name="hora"
        value={form.hora}
        onChange={alterarCampo}
        required
      />

      <textarea
        name="observacao"
        placeholder="Observação"
        value={form.observacao}
        onChange={alterarCampo}
      />

      <button type="submit">Agendar</button>
    </form>
  );
}

export default FormAgendamento;
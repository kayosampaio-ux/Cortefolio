import { useState } from 'react';
import { cadastrarCliente } from '../services/api';

function FormCliente() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  function alterarCampo(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function enviarFormulario(e) {
    e.preventDefault();

    try {
      await cadastrarCliente(form);
      alert('Cliente cadastrado com sucesso!');

      setForm({
        nome: '',
        email: '',
        telefone: ''
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cliente.');
    }
  }

  return (
    <form className="formulario" onSubmit={enviarFormulario}>
      <h2>Novo Cliente</h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome do cliente"
        value={form.nome}
        onChange={alterarCampo}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={alterarCampo}
        required
      />

      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={alterarCampo}
        required
      />

      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
}

export default FormCliente;
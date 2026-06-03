const API_URL = 'http://localhost:3001/api';

// PROFISSIONAIS
export async function listarProfissionais() {
  const response = await fetch(`${API_URL}/profissionais`);
  return response.json();
}

// SERVIÇOS
export async function listarServicos() {
  const response = await fetch(`${API_URL}/servicos`);
  return response.json();
}

// CLIENTES
export async function listarClientes() {
  const response = await fetch(`${API_URL}/clientes`);
  return response.json();
}

export async function cadastrarCliente(cliente) {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });

  return response.json();
}

// AGENDAMENTOS
export async function listarAgendamentos() {
  const response = await fetch(`${API_URL}/agendamentos`);
  return response.json();
}

export async function criarAgendamento(agendamento) {
  const response = await fetch(`${API_URL}/agendamentos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agendamento),
  });

  return response.json();
}

export async function atualizarAgendamento(id, dados) {
  const response = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  return response.json();
}

export async function excluirAgendamento(id) {
  const response = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'DELETE',
  });

  return response.json();
}
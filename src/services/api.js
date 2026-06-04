import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default api;

// PROFISSIONAIS
export async function listarProfissionais() {
  const response = await api.get("/profissionais");
  return response.data;
}

// SERVIÇOS
export async function listarServicos() {
  const response = await api.get("/servicos");
  return response.data;
}

// CLIENTES
export async function listarClientes() {
  const response = await api.get("/clientes");
  return response.data;
}

export async function cadastrarCliente(cliente) {
  const response = await api.post("/clientes", cliente);
  return response.data;
}

// AGENDAMENTOS
export async function listarAgendamentos() {
  const response = await api.get("/agendamentos");
  return response.data;
}

export async function criarAgendamento(agendamento) {
  const response = await api.post("/agendamentos", agendamento);
  return response.data;
}

export async function atualizarAgendamento(id, dados) {
  const response = await api.put(`/agendamentos/${id}`, dados);
  return response.data;
}

export async function excluirAgendamento(id) {
  const response = await api.delete(`/agendamentos/${id}`);
  return response.data;
}

// LOGIN
export async function loginUsuario(dados) {
  const response = await api.post("/auth/login", dados);
  return response.data;
}
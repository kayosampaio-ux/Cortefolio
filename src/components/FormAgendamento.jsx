import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { criarAgendamento } from '../services/api';

function FormAgendamento() {
  const [profissional, setProfissional] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosAgendamento = {
      cliente: nomeCliente,
      profissional_id: profissional,
      servico: servico,
      data: data,
      hora: hora
    };

    try {
      await criarAgendamento(dadosAgendamento);

      toast.success(`💈 Agendamento para ${data} às ${hora} enviado com sucesso!`, {
        style: {
          background: '#1a1a1a',
          color: '#d4af37',
          border: '1px solid #d4af37'
        },
        progressStyle: {
          background: '#d4af37'
        }
      });

      setNomeCliente('');
      setProfissional('');
      setServico('');
      setData('');
      setHora('');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar agendamento.');
    }
  };

  const handleDataChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');

    if (valor.length > 2) {
      valor = `${valor.substring(0, 2)}/${valor.substring(2, 4)}`;
    }

    setData(valor.substring(0, 5));
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      background: '#1a1a1a',
      padding: '20px',
      borderRadius: '8px',
      color: '#fff',
      marginTop: '15px'
    }}>
      <div>
        <label>Seu Nome:</label>
        <input
          type="text"
          required
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          placeholder="Digite seu nome completo"
        />
      </div>

      <div>
        <label>Escolha o Barbeiro:</label>
        <select required value={profissional} onChange={(e) => setProfissional(e.target.value)}>
          <option value="">Selecione um profissional</option>
          <option value="1">Alberth Maquininha</option>
          <option value="2">Felipe Mandrake</option>
          <option value="3">Kayo Navalha</option>
          <option value="4">Ramon Gilete</option>
        </select>
      </div>

      <div>
        <label>Escolha o Serviço:</label>
        <select required value={servico} onChange={(e) => setServico(e.target.value)}>
          <option value="">Selecione o serviço</option>
          <option value="Corte Simples">Corte Simples - R$ 35,00</option>
          <option value="Barba Completa">Barba Completa - R$ 25,00</option>
          <option value="Combo Cabelo e Barba">Combo Cabelo + Barba - R$ 50,00</option>
          <option value="Pé">Pezinho - R$ 5,00</option>
          <option value="Pigmentação">Pigmentação - R$ 8,00</option>
        </select>
      </div>

      <div>
        <label>Data:</label>
        <input
          type="text"
          required
          value={data}
          onChange={handleDataChange}
          placeholder="Ex: 12/05"
          maxLength="5"
        />
      </div>

      <div>
        <label>Horário:</label>
        <input
          type="time"
          required
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>

      <button type="submit">Confirmar Agendamento</button>
    </form>
  );
}

export default FormAgendamento;
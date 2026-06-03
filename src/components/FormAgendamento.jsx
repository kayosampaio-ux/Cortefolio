import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importando a notificação bonita

function FormAgendamento() {
  // Estados para guardar o que o usuário preenche
  const [profissional, setProfissional] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState(''); // Vai guardar direto o "DD/MM"
  const [hora, setHora] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');

  // Função disparada ao clicar no botão de agendar
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dadosAgendamento = {
      cliente: nomeCliente,
      profissional_id: profissional,
      servico: servico,
      data: data, // Já está apenas com dia e mês!
      hora: hora
    };

    console.log("Dados prontos para enviar para o PHP (Apenas Dia/Mês):", dadosAgendamento);
    
    // Notificação moderna substituindo o alert simples
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
    
    // Limpar campos após o envio
    setNomeCliente('');
    setProfissional('');
    setServico('');
    setData('');
    setHora('');
  };

  // Função para criar uma máscara simples de "00/00" enquanto digita
  const handleDataChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (valor.length > 2) {
      valor = `${valor.substring(0, 2)}/${valor.substring(2, 4)}`; // Coloca a barra automática
    }
    setData(valor.substring(0, 5)); // Limita em no máximo 5 caracteres (DD/MM)
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Seu Nome:</label>
        <input 
          type="text" 
          required
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          placeholder="Digite seu nome completo"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#242424', color: '#fff' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Escolha o Barbeiro:</label>
        <select 
          required
          value={profissional} 
          onChange={(e) => setProfissional(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#242424', color: '#fff' }}
        >
          <option value="">Selecione um profissional</option>
          <option value="1">Alberth Maquininha (Cabelo & Barba)</option>
          <option value="2">Felipe Mandrake (Degradê & Risquinho)</option>
          <option value="3">Kayo Navalha (Barboterapia)</option>
          <option value="4">Ramon Gilete (Corte & Sombrancelha)</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Escolha o Serviço:</label>
        <select 
          required
          value={servico} 
          onChange={(e) => setServico(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#242424', color: '#fff' }}
        >
          <option value="">Selecione o serviço</option>
          <option value="Corte Simples">Corte Simples - R$ 35,00</option>
          <option value="Barba Completa">Barba Completa - R$ 25,00</option>
          <option value="Combo Cabelo e Barba">Combo Cabelo + Barba - R$ 50,00</option>
          <option value="Pé">Pezinho- R$ 5,00 </option>
          <option value="Pigmentação">Pigmentação - R$ 8,00</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Data (Dia/Mês):</label>
          <input 
            type="text" 
            required
            value={data}
            onChange={handleDataChange}
            placeholder="Ex: 12/05"
            maxLength="5"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#242424', color: '#fff' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Horário:</label>
          <input 
            type="time" 
            required
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#242424', color: '#fff' }}
          />
        </div>
      </div>

      <button type="submit" style={{
        padding: '12px',
        background: '#d4af37', // Cor dourada/barbearia
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
      }}>
        Confirmar Agendamento
      </button>
    </form>
  );
}

export default FormAgendamento;
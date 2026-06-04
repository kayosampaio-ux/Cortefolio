import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para controlar qual tela está ativa.
  const [telaAtiva, setTelaAtiva] = useState('agendar');

  // Estados para capturar os dados digitados nos formulários de Login/Cadastro
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [cadNome, setCadNome] = useState('');
  const [cadTelefone, setCadTelefone] = useState('');
  const [cadEmail, setCadEmail] = useState('');
  const [cadSenha, setCadSenha] = useState('');

  // Estados para o formulário de Agendamento
  const [agendNome, setAgendNome] = useState('');
  const [agendBarbeiro, setAgendBarbeiro] = useState('');
  const [agendServico, setAgendServico] = useState('');
  const [agendData, setAgendData] = useState('');
  const [agendHorario, setAgendHorario] = useState('');

  // Estado que guarda a lista de agendamentos reais
  const [listaAgendamentos, setListaAgendamentos] = useState([]);

  // Carrega os agendamentos já salvos ao abrir o app
  useEffect(() => {
    const salvos = localStorage.getItem('agendamentosCortefolio');
    if (salvos) {
      setListaAgendamentos(JSON.parse(salvos));
    }
  }, []);

  // Função para salvar um novo agendamento
  const lidarComAgendamento = (e) => {
    e.preventDefault();

    const novoAgendamento = {
      id: Date.now(),
      cliente: agendNome,
      barbeiro: agendBarbeiro,
      servico: agendServico,
      data: agendData,
      horario: agendHorario,
      status: 'Confirmado'
    };

    const listaAtualizada = [...listaAgendamentos, novoAgendamento];
    setListaAgendamentos(listaAtualizada);
    localStorage.setItem('agendamentosCortefolio', JSON.stringify(listaAtualizada));

    alert('Agendamento realizado com sucesso!');
    
    setAgendNome('');
    setAgendBarbeiro('');
    setAgendServico('');
    setAgendData('');
    setAgendHorario('');
  };

  // Função para lidar com o Cadastro de Clientes comuns
  const lidarComCadastro = (e) => {
    e.preventDefault();
    const novoUsuario = {
      nome: cadNome,
      telefone: cadTelefone,
      email: cadEmail.toLowerCase(),
      senha: cadSenha,
      tipo: 'cliente' // Identifica que é um cliente comum
    };
    localStorage.setItem('usuarioCortefolio', JSON.stringify(novoUsuario));
    alert('Cadastro realizado com sucesso! Agora faça o seu login.');
    setCadNome(''); setCadTelefone(''); setCadEmail(''); setCadSenha('');
    setTelaAtiva('login');
  };

  // Função para lidar com o Login e bloqueio do Admin
  const lidarComLogin = (e) => {
    e.preventDefault();

    const emailDigitado = loginEmail.toLowerCase();
    const senhaDigitada = loginSenha;

    // 1. CONFIGURAÇÃO DA CREDENCIAL DO BARBEIRO / GERENTE
    // Altere o email e a senha abaixo para o que você quiser usar!
    const emailAdmin = "admin@cortefolio.com";
    const senhaAdmin = "admin123";

    // Verificação 1: É o barbeiro/admin administrador?
    if (emailDigitado === emailAdmin && senhaDigitada === senhaAdmin) {
      alert('Acesso concedido! Bem-vindo ao Painel Administrativo.');
      setLoginEmail('');
      setLoginSenha('');
      setTelaAtiva('admin'); // Vai para o Painel Secreto
      return;
    }

    // Verificação 2: Se não for o admin, procura nos usuários/clientes comuns do localStorage
    const usuarioSalvo = localStorage.getItem('usuarioCortefolio');
    if (usuarioSalvo) {
      const dadosUsuario = JSON.parse(usuarioSalvo);
      
      if (emailDigitado === dadosUsuario.email && senhaDigitada === dadosUsuario.senha) {
        alert(`Olá, ${dadosUsuario.nome}! Você logou como cliente.`);
        setLoginEmail('');
        setLoginSenha('');
        setTelaAtiva('inicio'); // Cliente comum vai para a Home, NÃO entra no admin
        return;
      }
    }

    // Se não passar em nenhuma das regras:
    alert('E-mail ou senha incorretos, ou você não tem permissão de Administrador.');
  };

  return (
    <>
      <header className="header">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setTelaAtiva('inicio')}>
          <div className="logo-icon">CF</div>
          <div>
            <h1>CORTEFOLIO</h1>
            <span>SEU CORTE, SUA IDENTIDADE</span>
          </div>
        </div>

        <nav>
          <a className={telaAtiva === 'inicio' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); setTelaAtiva('inicio'); }}>Início</a>
          <a className={telaAtiva === 'agendar' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); setTelaAtiva('agendar'); }}>Agendar</a>
          
          {/* O link direto para o Painel Admin foi removido daqui para os clientes não clicarem. 
              O Barbeiro só entra fazendo login! */}
          
          <a className={telaAtiva === 'clientes' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); setTelaAtiva('clientes'); }}>Clientes</a>
          <a className={telaAtiva === 'profissionais' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); setTelaAtiva('profissionais'); }}>Profissionais</a>
        </nav>

        <button 
          className={`login-btn ${telaAtiva === 'login' || telaAtiva === 'cadastro' ? 'active-btn' : ''}`}
          onClick={() => {
            if (telaAtiva === 'admin') {
              setTelaAtiva('agendar'); // Faz Logout se já estiver no Admin
            } else {
              setTelaAtiva('login');
            }
          }}
        >
          {telaAtiva === 'admin' ? 'Sair (Logout)' : 'Login'}
        </button>
      </header>

      <main className="container">
        {/* TELA DE INÍCIO */}
        {telaAtiva === 'inicio' && (
          <section className="hero">
            <div className="hero-content">
              <p className="tag">— BEM-VINDO AO CORTEFOLIO</p>
              <h2>Sua barbearia,<br /><span>no seu tempo.</span></h2>
              <p className="desc">Navegue pelo menu para gerenciar seus agendamentos e clientes.</p>
            </div>
          </section>
        )}

        {/* TELA DE AGENDAR */}
        {telaAtiva === 'agendar' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <p className="tag">— AGENDAMENTO ONLINE</p>
                <h2>Seu horário,<br /><span>do seu jeito.</span></h2>
                <p className="desc">Agende de forma rápida e fácil seu corte.</p>
              </div>

              <div className="benefits">
                <div>🛡️ <span>Profissionais<br />Qualificados</span></div>
                <div>🕒 <span>Agendamento<br />Rápido</span></div>
                <div>⭐ <span>Atendimento<br />Premium</span></div>
              </div>
            </section>

            <section className="form-card">
              <div className="form-title">
                <div className="calendar">📅</div>
                <div>
                  <h2>Novo Agendamento</h2>
                  <p>Preencha os dados abaixo para reservar um horário.</p>
                </div>
              </div>

              <form onSubmit={lidarComAgendamento}>
                <label>Seu Nome</label>
                <input type="text" placeholder="Digite seu nome completo" value={agendNome} onChange={(e) => setAgendNome(e.target.value)} required />

                <label>Escolha o Barbeiro</label>
                <select value={agendBarbeiro} onChange={(e) => setAgendBarbeiro(e.target.value)} required>
                  <option value="">Selecione um profissional</option>
                  <option>Alberth Tailon</option>
                  <option>Felipe Leal</option>
                  <option>Kayo Mario</option>
                  <option>Ramon Jesus</option>
                </select>

                <label>Escolha o Serviço</label>
                <select value={agendServico} onChange={(e) => setAgendServico(e.target.value)} required>
                  <option value="">Selecione o serviço</option>
                  <option>Corte masculino - R$ 30,00</option>
                  <option>Barba - R$15,00</option>
                  <option>Corte + Barba - R$45,00</option>
                  <option>Pezinho - R$ 5,00</option>
                  <option>Pigmentação - R$ 8,00</option>
                </select>

                <div className="row">
                  <div>
                    <label>Data</label>
                    <input type="date" value={agendData} onChange={(e) => setAgendData(e.target.value)} required />
                  </div>
                  <div>
                    <label>Horário</label>
                    <input type="time" value={agendHorario} onChange={(e) => setAgendHorario(e.target.value)} required />
                  </div>
                </div>

                <button type="submit" className="submit-btn">Confirmar Agendamento</button>
              </form>
            </section>
          </>
        )}

        {/* TELA DE LOGIN */}
        {telaAtiva === 'login' && (
          <section className="form-card" style={{ maxWidth: '450px', margin: '40px auto' }}>
            <div className="form-title">
              <div className="calendar">🔒</div>
              <div>
                <h2>Acesse sua Conta</h2>
                <p>Insira suas credenciais. Se for o barbeiro, use o login de gerência.</p>
              </div>
            </div>

            <form onSubmit={lidarComLogin}>
              <label>E-mail ou Usuário</label>
              <input type="email" placeholder="exemplo@email.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />

              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} required />

              <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>Entrar</button>
              
              <p style={{ color: '#fff', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                Não tem uma conta? <span style={{ color: '#ffcc00', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }} onClick={() => setTelaAtiva('cadastro')}>Cadastre-se aqui</span>
              </p>
            </form>
          </section>
        )}

        {/* TELA DE CADASTRO */}
        {telaAtiva === 'cadastro' && (
          <section className="form-card" style={{ maxWidth: '450px', margin: '40px auto' }}>
            <div className="form-title">
              <div className="calendar">📝</div>
              <div>
                <h2>Criar nova Conta</h2>
                <p>Preencha os dados abaixo para se cadastrar.</p>
              </div>
            </div>

            <form onSubmit={lidarComCadastro}>
              <label>Nome Completo</label>
              <input type="text" placeholder="Digite seu nome completo" value={cadNome} onChange={(e) => setCadNome(e.target.value)} required />

              <label>Telefone / WhatsApp</label>
              <input type="tel" placeholder="(71) 99999-9999" value={cadTelefone} onChange={(e) => setCadTelefone(e.target.value)} required />

              <label>E-mail</label>
              <input type="email" placeholder="seuemail@exemplo.com" value={cadEmail} onChange={(e) => setCadEmail(e.target.value)} required />

              <label>Senha</label>
              <input type="password" placeholder="Crie uma senha forte" value={cadSenha} onChange={(e) => setCadSenha(e.target.value)} required />

              <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>Finalizar Cadastro</button>
              
              <p style={{ color: '#fff', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                Já possui uma conta? <span style={{ color: '#ffcc00', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }} onClick={() => setTelaAtiva('login')}>Faça o Login</span>
              </p>
            </form>
          </section>
        )}

        {/* TELA PAINEL ADMIN (DASHBOARD) - PROTEGIDA */}
        {telaAtiva === 'admin' && (
          <section style={{ width: '100%', color: '#fff', marginTop: '20px' }}>
            <h2 style={{ color: '#ffcc00', marginBottom: '10px' }}>📊 Painel Administrativo (Barbeiro)</h2>
            <p style={{ marginBottom: '30px', opacity: 0.8 }}>Visualização exclusiva da equipe Cortefolio.</p>
            
            {/* Cards de Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: '#1c1c1e', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #ffcc00' }}>
                <h3 style={{ opacity: 0.7, fontSize: '14px', margin: 0 }}>Total de Agendamentos</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{listaAgendamentos.length}</p>
              </div>
              <div style={{ backgroundColor: '#1c1c1e', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #00cc66' }}>
                <h3 style={{ opacity: 0.7, fontSize: '14px', margin: 0 }}>Faturamento Estimado</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#00cc66' }}>
                  R$ {listaAgendamentos.length * 35},00
                </p>
              </div>
              <div style={{ backgroundColor: '#1c1c1e', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #0088cc' }}>
                <h3 style={{ opacity: 0.7, fontSize: '14px', margin: 0 }}>Barbeiros Ativos</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0' }}>4</p>
              </div>
            </div>

            {/* Tabela de Agendamentos */}
            <div style={{ backgroundColor: '#1c1c1e', padding: '25px', borderRadius: '8px', overflowX: 'auto' }}>
              <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #2c2c2e', paddingBottom: '10px' }}>📋 Próximos Clientes Agendados</h3>
              
              {listaAgendamentos.length === 0 ? (
                <p style={{ opacity: 0.6, textAlign: 'center', padding: '20px 0' }}>Nenhum agendamento realizado ainda.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ color: '#ffcc00', borderBottom: '2px solid #2c2c2e' }}>
                      <th style={{ padding: '12px' }}>Cliente</th>
                      <th style={{ padding: '12px' }}>Barbeiro</th>
                      <th style={{ padding: '12px' }}>Serviço</th>
                      <th style={{ padding: '12px' }}>Data</th>
                      <th style={{ padding: '12px' }}>Horário</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaAgendamentos.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #2c2c2e' }}>
                        <td style={{ padding: '12px' }}>{item.cliente}</td>
                        <td style={{ padding: '12px' }}>{item.barbeiro}</td>
                        <td style={{ padding: '12px' }}>{item.servico}</td>
                        <td style={{ padding: '12px' }}>{item.data.split('-').reverse().join('/')}</td>
                        <td style={{ padding: '12px' }}>{item.horario}</td>
                        <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#00cc66', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{item.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}

        {/* OUTRAS TELAS SECUNDÁRIAS */}
        {telaAtiva === 'clientes' && (
          <section className="hero-content">
            <h2>👥 Lista de Clientes</h2>
            <p className="desc">Aqui ficará o histórico de clientes da barbearia.</p>
          </section>
        )}

        {telaAtiva === 'profissionais' && (
          <section className="hero-content">
            <h2>✂️ Nossos Profissionais</h2>
            <p className="desc">Gerencie a equipe de barbeiros e seus horários de trabalho.</p>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
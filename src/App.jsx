import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para controlar qual tela está ativa.
  const [telaAtiva, setTelaAtiva] = useState('inicio'); // Mudou para 'inicio' para ser a recepção

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

  // NOVO ESTADO: Guarda o usuário que está logado atualmente na sessão
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Carrega os agendamentos e verifica se já existe alguém logado ao abrir o app
  useEffect(() => {
    const salvos = localStorage.getItem('agendamentosCortefolio');
    if (salvos) {
      setListaAgendamentos(JSON.parse(salvos));
    }

    // Verifica se existe uma sessão ativa (pode ser expandido depois se quiser salvar o estado de login)
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
      tipo: 'cliente'
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

    const emailAdmin = "admin@cortefolio.com";
    const senhaAdmin = "admin123";

    if (emailDigitado === emailAdmin && senhaDigitada === senhaAdmin) {
      alert('Acesso concedido! Bem-vindo ao Painel Administrativo.');
      setLoginEmail('');
      setLoginSenha('');
      setUsuarioLogado({ nome: 'Administrador', tipo: 'admin' });
      setTelaAtiva('admin'); 
      return;
    }

    const usuarioSalvo = localStorage.getItem('usuarioCortefolio');
    if (usuarioSalvo) {
      const dadosUsuario = JSON.parse(usuarioSalvo);
      
      if (emailDigitado === dadosUsuario.email && senhaDigitada === dadosUsuario.senha) {
        alert(`Olá, ${dadosUsuario.nome}! Você logou como cliente.`);
        setLoginEmail('');
        setLoginSenha('');
        setUsuarioLogado(dadosUsuario); // Salva o objeto do usuário logado no estado
        setAgendNome(dadosUsuario.nome); // Auto-preenche o nome dele no formulário de agendamento!
        setTelaAtiva('agendar'); // Manda ele direto para a tela de agendamento após o login
        return;
      }
    }

    alert('E-mail ou senha incorretos, ou você não tem permissão de Administrador.');
  };

  // FUNÇÃO DE REGRAS DE NAVEGAÇÃO (Bloqueia telas se não estiver logado)
  const navegarPara = (tela) => {
    if (tela === 'agendar' && !usuarioLogado) {
      alert('Por favor, faça login ou cadastre-se para realizar um agendamento.');
      setTelaAtiva('login');
      return;
    }
    setTelaAtiva(tela);
  };

  // Função para deslogar (Logout)
  const fazerLogout = () => {
    setUsuarioLogado(null);
    setAgendNome('');
    setTelaAtiva('inicio');
    alert('Sessão encerrada com sucesso.');
  };

  // Função auxiliar para extrair o valor numérico do texto do serviço
  const extrairPreco = (textoServico) => {
    if (!textoServico) return 0;
    const partes = textoServico.split('R$');
    if (partes.length < 2) return 0;
    const valorLimpo = partes[1].trim().replace(',', '.');
    return parseFloat(valorLimpo) || 0;
  };

  // Calcula o faturamento geral somando todos os serviços reais da lista
  const faturamentoGeral = listaAgendamentos.reduce((total, item) => {
    return total + extrairPreco(item.servico);
  }, 0);

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navegarPara('inicio')}>
          <div className="logo-icon">CF</div>
          <div>
            <h1>CORTEFOLIO</h1>
            <span>SEU CORTE, SUA IDENTIDADE</span>
          </div>
        </div>

        <nav>
          <a className={telaAtiva === 'inicio' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('inicio'); }}>Início</a>
          <a className={telaAtiva === 'agendar' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('agendar'); }}>Agendar</a>
          <a className={telaAtiva === 'clientes' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('clientes'); }}>Clientes</a>
          <a className={telaAtiva === 'profissionais' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('profissionais'); }}>Profissionais</a>
        </nav>

        {/* Botão Dinâmico de Login / Logout */}
        {usuarioLogado ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#d4a72c', fontSize: '14px', fontWeight: 'bold' }}>
              Olá, {usuarioLogado.nome.split(' ')[0]}!
            </span>
            <button className="login-btn" onClick={fazerLogout}>
              Sair
            </button>
          </div>
        ) : (
          <button 
            className={`login-btn ${telaAtiva === 'login' || telaAtiva === 'cadastro' ? 'active-btn' : ''}`}
            onClick={() => setTelaAtiva('login')}
          >
            Login
          </button>
        )}
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

        {/* TELA DE AGENDAR (PROTEGIDA POR LOGIN) */}
        {telaAtiva === 'agendar' && usuarioLogado && (
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
                {/* Campo desabilitado ou preenchido automaticamente com o nome do login */}
                <input type="text" placeholder="Digite seu nome completo" value={agendNome} onChange={(e) => setAgendNome(e.target.value)} disabled required />

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
                  <option>Barba - R$ 15,00</option>
                  <option>Corte + Barba - R$ 45,00</option>
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
          <section className="form-card form-auth">
            <div className="form-title">
              <div className="calendar">🔒</div>
              <div>
                <h2>Acesse sua Conta</h2>
                <p>Insira suas credenciais corporativas ou de cliente.</p>
              </div>
            </div>

            <form onSubmit={lidarComLogin}>
              <label>E-mail ou Usuário</label>
              <input type="email" placeholder="exemplo@email.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />

              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} required />

              <button type="submit" className="submit-btn text-dark">Entrar</button>
              
              <p className="auth-toggle-text">
                Não tem uma conta? <span onClick={() => setTelaAtiva('cadastro')}>Cadastre-se aqui</span>
              </p>
            </form>
          </section>
        )}

        {/* TELA DE CADASTRO */}
        {telaAtiva === 'cadastro' && (
          <section className="form-card form-auth">
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

              <button type="submit" className="submit-btn text-dark">Finalizar Cadastro</button>
              
              <p className="auth-toggle-text">
                Já possui uma conta? <span onClick={() => setTelaAtiva('login')}>Faça o Login</span>
              </p>
            </form>
          </section>
        )}

        {/* TELA PAINEL ADMIN (DASHBOARD) - PROTEGIDA */}
        {telaAtiva === 'admin' && usuarioLogado?.tipo === 'admin' && (
          <section className="admin-container">
            <div className="admin-header">
              <h2>📊 Painel Administrativo (Barbeiro)</h2>
              <p>Visualização exclusiva da gerência e controle de fluxo.</p>
            </div>
            
            <div className="metrics-grid">
              <div className="metric-card border-gold">
                <h3>Total de Agendamentos</h3>
                <p className="metric-number">{listaAgendamentos.length}</p>
              </div>
              <div className="metric-card border-green">
                <h3>Faturamento Real</h3>
                <p className="metric-number text-green">
                  R$ {faturamentoGeral.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="metric-card border-blue">
                <h3>Barbeiros Ativos</h3>
                <p className="metric-number">4</p>
              </div>
            </div>

            {/* Lucros Individuais Separados */}
            <div className="table-card" style={{ marginBottom: '30px' }}>
              <h3 className="table-title">💰 Faturamento por Barbeiro</h3>
              <div className="barber-lucro-grid">
                {['Alberth Tailon', 'Felipe Leal', 'Kayo Mario', 'Ramon Jesus'].map((barbeiro) => {
                  const agendamentosDoBarbeiro = listaAgendamentos.filter(item => item.barbeiro === barbeiro);
                  const lucroIndividual = agendamentosDoBarbeiro.reduce((total, item) => {
                    return total + extrairPreco(item.servico);
                  }, 0);

                  return (
                    <div key={barbeiro} className="barber-lucro-card">
                      <div className="barber-info">
                        <span className="barber-icon">✂️</span>
                        <div>
                          <h4>{barbeiro}</h4>
                          <p>{agendamentosDoBarbeiro.length} {agendamentosDoBarbeiro.length === 1 ? 'atendimento' : 'atendimentos'}</p>
                        </div>
                      </div>
                      <span className="barber-value">
                        R$ {lucroIndividual.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="table-card">
              <h3 className="table-title">📋 Próximos Clientes Agendados</h3>
              
              {listaAgendamentos.length === 0 ? (
                <p className="no-data">Nenhum agendamento realizado ainda.</p>
              ) : (
                <div className="responsive-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Barbeiro</th>
                        <th>Serviço</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaAgendamentos.map((item) => (
                        <tr key={item.id}>
                          <td>{item.cliente}</td>
                          <td>{item.barbeiro}</td>
                          <td>{item.servico}</td>
                          <td>{item.data.split('-').reverse().join('/')}</td>
                          <td>{item.horario}</td>
                          <td>
                            <span className="status-label">{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
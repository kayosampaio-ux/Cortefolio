import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo-icon.png';

import {
  listarProfissionais,
  listarServicos,
  listarClientes,
  listarAgendamentos,
  cadastrarCliente,
  criarAgendamento
} from './services/api';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('inicio');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [cadNome, setCadNome] = useState('');
  const [cadTelefone, setCadTelefone] = useState('');
  const [cadEmail, setCadEmail] = useState('');
  const [cadSenha, setCadSenha] = useState('');

  const [agendNome, setAgendNome] = useState('');
  const [agendBarbeiro, setAgendBarbeiro] = useState('');
  const [agendServico, setAgendServico] = useState('');
  const [agendData, setAgendData] = useState('');
  const [agendHorario, setAgendHorario] = useState('');

  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [listaProfissionais, setListaProfissionais] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);

  const [usuarioLogado, setUsuarioLogado] = useState(null);

  async function carregarDados() {
    try {
      const [profissionais, servicos, clientes, agendamentos] = await Promise.all([
        listarProfissionais(),
        listarServicos(),
        listarClientes(),
        listarAgendamentos()
      ]);

      setListaProfissionais(profissionais);
      setListaServicos(servicos);
      setListaClientes(clientes);
      setListaAgendamentos(agendamentos);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function buscarCliente(id) {
    return listaClientes.find((cliente) => Number(cliente.id) === Number(id));
  }

  function buscarServico(id) {
    return listaServicos.find((servico) => Number(servico.id) === Number(id));
  }

  function buscarProfissional(id) {
    return listaProfissionais.find((profissional) => Number(profissional.id) === Number(id));
  }

  function formatarData(dataHora) {
    if (!dataHora) return '';
    return String(dataHora).split('T')[0].split('-').reverse().join('/');
  }

  function formatarHora(dataHora) {
    if (!dataHora) return '';
    const hora = String(dataHora).split('T')[1] || String(dataHora).split(' ')[1] || '';
    return hora.slice(0, 5);
  }

  const lidarComAgendamento = async (e) => {
    e.preventDefault();

    if (!usuarioLogado?.id) {
      alert('Faça login novamente antes de agendar.');
      return;
    }

    try {
      await criarAgendamento({
        cliente_id: usuarioLogado.id,
        servico_id: Number(agendServico),
        data_hora: `${agendData} ${agendHorario}:00`,
        status: 'agendado',
        observacao: 'Agendado pelo site'
      });

      alert('Agendamento realizado com sucesso!');

      setAgendBarbeiro('');
      setAgendServico('');
      setAgendData('');
      setAgendHorario('');

      await carregarDados();
      setTelaAtiva('admin');
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar agendamento.');
    }
  };

  const lidarComCadastro = async (e) => {
    e.preventDefault();

    try {
      const resposta = await cadastrarCliente({
        nome: cadNome,
        telefone: cadTelefone,
        email: cadEmail.toLowerCase()
      });

      const novoUsuario = {
        id: resposta.id,
        nome: cadNome,
        telefone: cadTelefone,
        email: cadEmail.toLowerCase(),
        senha: cadSenha,
        tipo: 'cliente'
      };

      localStorage.setItem('usuarioCortefolio', JSON.stringify(novoUsuario));

      alert('Cadastro realizado com sucesso! Agora faça o seu login.');

      setCadNome('');
      setCadTelefone('');
      setCadEmail('');
      setCadSenha('');

      await carregarDados();
      setTelaAtiva('login');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Talvez este e-mail já esteja cadastrado.');
    }
  };

  const lidarComLogin = (e) => {
    e.preventDefault();

    const emailDigitado = loginEmail.toLowerCase();
    const senhaDigitada = loginSenha;

    const emailAdmin = 'admin@cortefolio.com';
    const senhaAdmin = 'admin123';

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
        setUsuarioLogado(dadosUsuario);
        setAgendNome(dadosUsuario.nome);
        setTelaAtiva('agendar');
        return;
      }
    }

    alert('E-mail ou senha incorretos, ou você não tem permissão de Administrador.');
  };

  const navegarPara = (tela) => {
    if (tela === 'agendar' && !usuarioLogado) {
      alert('Por favor, faça login ou cadastre-se para realizar um agendamento.');
      setTelaAtiva('login');
      return;
    }

    if ((tela === 'clientes' || tela === 'admin') && usuarioLogado?.tipo !== 'admin') {
      alert('Acesso negado. Apenas o Administrador pode acessar essa área.');
      setTelaAtiva('inicio');
      return;
    }

    setTelaAtiva(tela);
  };

  const fazerLogout = () => {
    setUsuarioLogado(null);
    setAgendNome('');
    setTelaAtiva('inicio');
    alert('Sessão encerrada com sucesso.');
  };

  const faturamentoGeral = listaAgendamentos.reduce((total, item) => {
    const servico = buscarServico(item.servico_id);
    return total + Number(servico?.preco || 0);
  }, 0);

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navegarPara('inicio')}>
          <div className="logo-icon">
            <img src={logo} alt="Cortefolio" />
          </div>
        </div>

        <nav>
          <a className={telaAtiva === 'inicio' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('inicio'); }}>Início</a>
          <a className={telaAtiva === 'agendar' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('agendar'); }}>Agendar</a>

          {usuarioLogado?.tipo === 'admin' && (
            <>
              <a className={telaAtiva === 'admin' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('admin'); }}>Painel Admin</a>
              <a className={telaAtiva === 'clientes' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('clientes'); }}>Clientes</a>
            </>
          )}

          <a className={telaAtiva === 'profissionais' ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); navegarPara('profissionais'); }}>Profissionais</a>
        </nav>

        {usuarioLogado ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#d4a72c', fontSize: '14px', fontWeight: 'bold' }}>
              Olá, {usuarioLogado.nome.split(' ')[0]}!
            </span>
            <button className="login-btn" onClick={fazerLogout}>Sair</button>
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
        {telaAtiva === 'inicio' && (
          <section className="hero">
            <div className="hero-content">
              <p className="tag">— BEM-VINDO AO CORTEFOLIO</p>
              <h2>Sua barbearia,<br /><span>no seu tempo.</span></h2>
              <p className="desc">Navegue pelo menu para gerenciar seus agendamentos e clientes.</p>
            </div>
          </section>
        )}

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
                <input type="text" placeholder="Digite seu nome completo" value={agendNome} disabled required />

                <label>Escolha o Barbeiro</label>
                <select
                  value={agendBarbeiro}
                  onChange={(e) => {
                    setAgendBarbeiro(e.target.value);
                    setAgendServico('');
                  }}
                  required
                >
                  <option value="">Selecione um profissional</option>
                  {listaProfissionais.map((profissional) => (
                    <option key={profissional.id} value={profissional.id}>
                      {profissional.nome} - {profissional.especialidade}
                    </option>
                  ))}
                </select>

                <label>Escolha o Serviço</label>
                <select value={agendServico} onChange={(e) => setAgendServico(e.target.value)} required>
                  <option value="">Selecione o serviço</option>
                  {listaServicos
                    .filter((servico) => !agendBarbeiro || Number(servico.profissional_id) === Number(agendBarbeiro))
                    .map((servico) => (
                      <option key={servico.id} value={servico.id}>
                        {servico.nome} - R$ {Number(servico.preco).toFixed(2).replace('.', ',')}
                      </option>
                    ))}
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

        {telaAtiva === 'admin' && usuarioLogado?.tipo === 'admin' && (
          <section className="admin-container">
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
                <p className="metric-number">{listaProfissionais.length}</p>
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
                        <th>Serviço</th>
                        <th>Profissional</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaAgendamentos.map((item) => {
                        const cliente = buscarCliente(item.cliente_id);
                        const servico = buscarServico(item.servico_id);
                        const profissional = buscarProfissional(servico?.profissional_id);

                        return (
                          <tr key={item.id}>
                            <td>{cliente?.nome || item.cliente_id}</td>
                            <td>{servico?.nome || item.servico_id}</td>
                            <td>{profissional?.nome || '-'}</td>
                            <td>{formatarData(item.data_hora)}</td>
                            <td>{formatarHora(item.data_hora)}</td>
                            <td>
                              <span className="status-label">{item.status}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {telaAtiva === 'clientes' && usuarioLogado?.tipo === 'admin' && (
          <section className="admin-container">
            <div className="admin-header">
              <h2>👥 Histórico e Lista de Clientes</h2>
              <p>Clientes cadastrados no banco de dados.</p>
            </div>

            <div className="table-card">
              <h3 className="table-title">📋 Clientes Encontrados</h3>

              {listaClientes.length === 0 ? (
                <p className="no-data">Nenhum cliente cadastrado ainda.</p>
              ) : (
                <div className="responsive-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nome do Cliente</th>
                        <th>E-mail</th>
                        <th>Contato / WhatsApp</th>
                        <th>Cadastro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaClientes.map((cliente) => (
                        <tr key={cliente.id}>
                          <td style={{ fontWeight: 'bold', color: '#fff' }}>{cliente.nome}</td>
                          <td>{cliente.email}</td>
                          <td>{cliente.telefone}</td>
                          <td>{formatarData(cliente.data_cadastro)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {telaAtiva === 'profissionais' && (
          <section className="admin-container">
            <div className="admin-header">
              <h2>✂️ Nossos Profissionais</h2>
              <p className="desc">Equipe cadastrada no banco de dados.</p>
            </div>

            <div className="barber-lucro-grid">
              {listaProfissionais.map((profissional) => (
                <div key={profissional.id} className="barber-lucro-card">
                  <div className="barber-info">
                    <span className="barber-icon">✂️</span>
                    <div>
                      <h4>{profissional.nome}</h4>
                      <p>{profissional.especialidade}</p>
                    </div>
                  </div>
                  <span className="barber-value">
                    {profissional.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;

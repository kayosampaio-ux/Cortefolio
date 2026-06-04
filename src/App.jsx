import { useState } from 'react';
import './App.css';

function App() {
  // Estado para controlar qual tela está ativa.
  const [telaAtiva, setTelaAtiva] = useState('agendar');

  // Estados para capturar os dados digitados nos formulários
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const [cadNome, setCadNome] = useState('');
  const [cadTelefone, setCadTelefone] = useState('');
  const [cadEmail, setCadEmail] = useState('');
  const [cadSenha, setCadSenha] = useState('');

  // Função para lidar com o Cadastro
  const lidarComCadastro = (e) => {
    e.preventDefault();

    // Cria um objeto com os dados do novo usuário
    const novoUsuario = {
      nome: cadNome,
      telefone: cadTelefone,
      email: cadEmail.toLowerCase(),
      senha: cadSenha
    };

    // Salva no localStorage do navegador convertendo para texto
    localStorage.setItem('usuarioCortefolio', JSON.stringify(novoUsuario));

    alert('Cadastro realizado com sucesso! Agora faça o seu login.');
    
    // Limpa o formulário de cadastro e joga para o login
    setCadNome('');
    setCadTelefone('');
    setCadEmail('');
    setCadSenha('');
    setTelaAtiva('login');
  };

  // Função para lidar com o Login
  const lidarComLogin = (e) => {
    e.preventDefault();

    // Busca o usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem('usuarioCortefolio');

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado neste navegador! Por favor, cadastre-se primeiro.');
      return;
    }

    // Converte o texto de volta para objeto do JavaScript
    const dadosUsuario = JSON.parse(usuarioSalvo);

    // Valida se o email e a senha batem perfeitamente
    if (loginEmail.toLowerCase() === dadosUsuario.email && loginSenha === dadosUsuario.senha) {
      alert(`Bem-vindo de volta, ${dadosUsuario.nome}!`);
      setLoginEmail('');
      setLoginSenha('');
      setTelaAtiva('inicio'); // Login com sucesso, vai para o Início
    } else {
      alert('E-mail ou senha incorretos! Tente novamente.');
    }
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
          <a 
            className={telaAtiva === 'inicio' ? 'active' : ''} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setTelaAtiva('inicio'); }}
          >
            Início
          </a>
          <a 
            className={telaAtiva === 'agendar' ? 'active' : ''} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setTelaAtiva('agendar'); }}
          >
            Agendar
          </a>
          <a 
            className={telaAtiva === 'agenda' ? 'active' : ''} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setTelaAtiva('agenda'); }}
          >
            Agenda
          </a>
          <a 
            className={telaAtiva === 'clientes' ? 'active' : ''} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setTelaAtiva('clientes'); }}
          >
            Clientes
          </a>
          <a 
            className={telaAtiva === 'profissionais' ? 'active' : ''} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setTelaAtiva('profissionais'); }}
          >
            Profissionais
          </a>
        </nav>

        <button 
          className={`login-btn ${telaAtiva === 'login' || telaAtiva === 'cadastro' ? 'active-btn' : ''}`}
          onClick={() => setTelaAtiva('login')}
        >
          Login
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

              <form onSubmit={(e) => { e.preventDefault(); alert('Agendamento Confirmado!'); }}>
                <label>Seu Nome</label>
                <input type="text" placeholder="Digite seu nome completo" required />

                <label>Escolha o Barbeiro</label>
                <select required>
                  <option value="">Selecione um profissional</option>
                  <option>Alberth Tailon</option>
                  <option>Felipe Leal</option>
                  <option>Kayo Mario</option>
                  <option>Ramon Jesus</option>
                </select>

                <label>Escolha o Serviço</label>
                <select required>
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
                    <input type="date" required />
                  </div>
                  <div>
                    <label>Horário</label>
                    <input type="time" required />
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
                <p>Insira suas credenciais para entrar no sistema.</p>
              </div>
            </div>

            <form onSubmit={lidarComLogin}>
              <label>E-mail ou Usuário</label>
              <input 
                type="email" 
                placeholder="exemplo@email.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />

              <label>Senha</label>
              <input 
                type="password" 
                placeholder="Digite sua senha" 
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                required 
              />

              <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>
                Entrar
              </button>
              
              <p style={{ color: '#fff', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                Não tem uma conta?{' '}
                <span 
                  style={{ color: '#ffcc00', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }} 
                  onClick={() => setTelaAtiva('cadastro')}
                >
                  Cadastre-se aqui
                </span>
              </p>

              <button 
                type="button" 
                className="submit-btn" 
                style={{ backgroundColor: 'transparent', border: '1px solid #ffcc00', color: '#ffcc00', marginTop: '15px' }}
                onClick={() => setTelaAtiva('agendar')}
              >
                Cancelar
              </button>
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
                <p>Preencha os dados abaixo para se cadastrar no Cortefolio.</p>
              </div>
            </div>

            <form onSubmit={lidarComCadastro}>
              <label>Nome Completo</label>
              <input 
                type="text" 
                placeholder="Digite seu nome completo" 
                value={cadNome}
                onChange={(e) => setCadNome(e.target.value)}
                required 
              />

              <label>Telefone / WhatsApp</label>
              <input 
                type="tel" 
                placeholder="(71) 99999-9999" 
                value={cadTelefone}
                onChange={(e) => setCadTelefone(e.target.value)}
                required 
              />

              <label>E-mail</label>
              <input 
                type="email" 
                placeholder="seuemail@exemplo.com" 
                value={cadEmail}
                onChange={(e) => setCadEmail(e.target.value)}
                required 
              />

              <label>Senha</label>
              <input 
                type="password" 
                placeholder="Crie uma senha forte" 
                value={cadSenha}
                onChange={(e) => setCadSenha(e.target.value)}
                required 
              />

              <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>
                Finalizar Cadastro
              </button>
              
              <p style={{ color: '#fff', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                Já possui uma conta?{' '}
                <span 
                  style={{ color: '#ffcc00', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }} 
                  onClick={() => setTelaAtiva('login')}
                >
                  Faça o Login
                </span>
              </p>
            </form>
          </section>
        )}

        {/* TELAS SECUNDÁRIAS */}
        {telaAtiva === 'agenda' && (
          <section className="hero-content">
            <h2>📅 Visualizar Agenda</h2>
            <p className="desc">Aqui você verá os horários já marcados.</p>
          </section>
        )}

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
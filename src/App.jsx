import { useState } from 'react';
import './App.css';

function App() {
  // Estado para controlar qual tela está ativa. Começa em 'agendar'
  const [telaAtiva, setTelaAtiva] = useState('agendar');

  return (
    <>
      <header className="header">
        <div className="logo">
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

        <button className="login-btn">Login</button>
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

        {/* TELA DE AGENDAR (Seu formulário atual) */}
        {telaAtiva === 'agendar' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <p className="tag">— AGENDAMENTO ONLINE</p>
                <h2>
                  Seu horário,
                  <br />
                  <span>do seu jeito.</span>
                </h2>
                <p className="desc">
                  Agende de forma rápida e fácil seu corte.
                </p>
              </div>

              <div className="benefits">
                <div>
                  🛡️ <span>Profissionais<br />Qualificados</span>
                </div>
                <div>
                  🕒 <span>Agendamento<br />Rápido</span>
                </div>
                <div>
                  ⭐ <span>Atendimento<br />Premium</span>
                </div>
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
                  <option>Corte masculino</option>
                  <option>Barba</option>
                  <option>Corte + Barba</option>
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

                <button type="submit" className="submit-btn">
                  Confirmar Agendamento
                </button>
              </form>
            </section>
          </>
        )}

        {/* TELAS SECUNDÁRIAS (Espaços reservados para as outras seções) */}
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
import './App.css';

function App() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon">CF</div>
          <div>
            <h1>CORTEFOLIO</h1>
            <span>SEU ESTILO, NOSSA ARTE</span>
          </div>
        </div>

        <nav>
          <a href="#">Início</a>
          <a className="active" href="#">Agendar</a>
          <a href="#">Agenda</a>
          <a href="#">Clientes</a>
          <a href="#">Profissionais</a>
        </nav>

        <button className="login-btn">Login</button>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <p className="tag">— AGENDAMENTO ONLINE</p>
            <h2>Seu horário,<br /><span>do seu jeito.</span></h2>
            <p className="desc">
              Agende de forma rápida e fácil com seu profissional favorito.
            </p>
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

          <form>
            <label>Seu Nome</label>
            <input type="text" placeholder="Digite seu nome completo" />

            <label>Escolha o Barbeiro</label>
            <select>
              <option>Selecione um profissional</option>
              <option>João</option>
              <option>Marcos</option>
              <option>Pedro</option>
            </select>

            <label>Escolha o Serviço</label>
            <select>
              <option>Selecione o serviço</option>
              <option>Corte masculino</option>
              <option>Barba</option>
              <option>Corte + Barba</option>
            </select>

            <div className="row">
              <div>
                <label>Data</label>
                <input type="date" />
              </div>

              <div>
                <label>Horário</label>
                <input type="time" />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Confirmar Agendamento
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
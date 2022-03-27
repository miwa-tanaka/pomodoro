import './scss/index.scss';

function App() {
  return (
    <div className="main-body">
      <header>
        <h1>pomodoro</h1>
      </header>
      <main>
        <section className="options">
          <div>
            <input type="radio" id="pomodoro" name="options" defaultChecked/>
            <label htmlFor="pomodoro">pomodoro</label>
            <input type="radio" id="shortbreak" name="options" />
            <label htmlFor="shortbreak">short break</label>
            <input type="radio" id="longbreak" name="options" />
            <label htmlFor="longbreak">long break</label>
          </div>
        </section>
        <section></section>
        <section></section>
      </main>
    </div>
  );
}

export default App;

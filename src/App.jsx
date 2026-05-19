import PasswordStrengthMeter from './components/PasswordStrengthMeter.jsx';

export default function App() {
  return (
    <main className="app">
      <section className="app__card">
        <header className="app__header">
          <h1 className="app__title">Password Strength Meter</h1>
          <p className="app__subtitle">
            Escribe una contraseña y observa su nivel de fortaleza en tiempo real.
          </p>
        </header>
        <PasswordStrengthMeter />
      </section>
    </main>
  );
}

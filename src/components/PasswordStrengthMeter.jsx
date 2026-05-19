import { useState } from 'react';
import { calculateStrength } from '../lib/calculateStrength.js';
import './PasswordStrengthMeter.css';

// Mapeo de fortaleza -> porcentaje para la barra de progreso (0-100).
// Cinco escalones para los cinco estados posibles.
const STRENGTH_PERCENTAGE = {
  'vacía': 0,
  'débil': 20,
  'media': 50,
  'fuerte': 75,
  'muy fuerte': 100,
};

// Componente principal: input de contraseña + barra de progreso + texto.
// - El cálculo se delega a la función pura `calculateStrength`.
// - El indicador textual usa role="status" (live region).
// - La barra usa role="progressbar" con aria-valuemin/max/now.
export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  const strength = calculateStrength(password);
  const percentage = STRENGTH_PERCENTAGE[strength] ?? 0;

  return (
    <div className="psm" data-strength={strength}>
      <label htmlFor="psm-password" className="psm__label">
        Contraseña
      </label>
      <input
        id="psm-password"
        type="password"
        className="psm__input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        placeholder="Escríbela aquí…"
      />
      <div
        className="psm__bar"
        role="progressbar"
        aria-label="Nivel de fortaleza"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="psm__bar-fill"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
      <p role="status" className="psm__indicator" data-strength={strength}>
        <span className="psm__indicator-dot" aria-hidden="true" />
        <span className="psm__indicator-text">{strength}</span>
      </p>
      <small className="psm__hint">
        Mínimo 8 caracteres. Combina números y símbolos para mayor seguridad.
      </small>
    </div>
  );
}

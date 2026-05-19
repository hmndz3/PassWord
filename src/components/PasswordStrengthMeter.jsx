import { useState } from 'react';
import { calculateStrength } from '../lib/calculateStrength.js';

// Componente principal: input de contraseña + indicador de fortaleza.
// El cálculo se delega a la función pura `calculateStrength`.
// El indicador usa role="status" para accesibilidad (live region).
export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  const strength = calculateStrength(password);

  return (
    <div className="psm">
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
      />
      <p role="status" className="psm__indicator" data-strength={strength}>
        {strength}
      </p>
    </div>
  );
}

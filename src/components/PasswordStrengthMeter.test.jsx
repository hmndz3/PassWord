import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordStrengthMeter from './PasswordStrengthMeter.jsx';

// Tests de comportamiento: el usuario interactúa con el input
// y observa el indicador de fortaleza. No se testea estado interno.

describe('<PasswordStrengthMeter />', () => {
  describe('renderizado', () => {
    it('renderiza un input de tipo password accesible por label', () => {
      render(<PasswordStrengthMeter />);
      const input = screen.getByLabelText(/contraseña/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
      render(<PasswordStrengthMeter />);
      const indicator = screen.getByRole('status');
      expect(indicator).toHaveTextContent('vacía');
    });
  });

  describe('comportamiento', () => {
    it('escribir una contraseña corta muestra "débil"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), 'abc');
      expect(screen.getByRole('status')).toHaveTextContent('débil');
    });

    it('escribir 8+ chars sin números ni símbolos muestra "media"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh');
      expect(screen.getByRole('status')).toHaveTextContent('media');
    });

    it('escribir 8+ chars con al menos un número muestra "fuerte"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), 'contra123');
      expect(screen.getByRole('status')).toHaveTextContent('fuerte');
    });

    it('escribir 8+ chars con número y símbolo muestra "muy fuerte"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), 'contra1!');
      expect(screen.getByRole('status')).toHaveTextContent('muy fuerte');
    });

    it('borrar completamente la contraseña vuelve a mostrar "vacía"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      const input = screen.getByLabelText(/contraseña/i);
      await user.type(input, 'algo');
      await user.clear(input);
      expect(screen.getByRole('status')).toHaveTextContent('vacía');
    });
  });

  describe('edge cases', () => {
    it('contraseña de exactamente 8 caracteres sin números NO es "débil"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh');
      const text = screen.getByRole('status').textContent;
      expect(text).not.toBe('débil');
    });

    it('contraseña de exactamente 7 caracteres NO es "media"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg');
      const text = screen.getByRole('status').textContent;
      expect(text).not.toBe('media');
    });

    it('contraseña con solo símbolos y menos de 8 caracteres sigue siendo "débil"', async () => {
      const user = userEvent.setup();
      render(<PasswordStrengthMeter />);
      await user.type(screen.getByLabelText(/contraseña/i), '!@#$');
      expect(screen.getByRole('status')).toHaveTextContent('débil');
    });
  });

  describe('accesibilidad (bonus)', () => {
    it('el input de contraseña está asociado a un label accesible', () => {
      render(<PasswordStrengthMeter />);
      // getByLabelText falla si no existe un label asociado al input.
      const input = screen.getByLabelText(/contraseña/i);
      expect(input).toBeInTheDocument();
    });
  });
});

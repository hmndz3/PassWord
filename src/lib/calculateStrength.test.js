import { describe, it, expect } from 'vitest';
import { calculateStrength } from './calculateStrength.js';

describe('calculateStrength (lógica pura)', () => {
  describe('contraseña vacía', () => {
    it('retorna "vacía" para string vacío', () => {
      expect(calculateStrength('')).toBe('vacía');
    });
  });

  describe('débil: menos de 8 caracteres', () => {
    it('retorna "débil" para 1 caracter', () => {
      expect(calculateStrength('a')).toBe('débil');
    });

    it('retorna "débil" para 7 caracteres alfabéticos', () => {
      expect(calculateStrength('abcdefg')).toBe('débil');
    });

    it('retorna "débil" para 7 caracteres con número y símbolo', () => {
      expect(calculateStrength('a1!bcd2')).toBe('débil');
    });

    it('retorna "débil" para solo símbolos con menos de 8 caracteres', () => {
      expect(calculateStrength('!@#$%^&')).toBe('débil');
    });
  });

  describe('media: 8+ caracteres sin número ni símbolo', () => {
    it('retorna "media" para exactamente 8 letras', () => {
      expect(calculateStrength('abcdefgh')).toBe('media');
    });

    it('retorna "media" para 15 letras', () => {
      expect(calculateStrength('abcdefghijklmno')).toBe('media');
    });
  });

  describe('fuerte: 8+ caracteres con al menos un número y sin símbolos', () => {
    it('retorna "fuerte" para 8 chars con un número', () => {
      expect(calculateStrength('abcdefg1')).toBe('fuerte');
    });

    it('retorna "fuerte" para mezcla de letras y números sin símbolos', () => {
      expect(calculateStrength('contra123')).toBe('fuerte');
    });
  });

  describe('muy fuerte: 8+ caracteres con número y símbolo', () => {
    it('retorna "muy fuerte" con número y símbolo !', () => {
      expect(calculateStrength('contra1!')).toBe('muy fuerte');
    });

    it('retorna "muy fuerte" con número y espacio (espacio cuenta como símbolo)', () => {
      expect(calculateStrength('contra 1')).toBe('muy fuerte');
    });

    it('retorna "muy fuerte" con número y @', () => {
      expect(calculateStrength('mi_pass@2026')).toBe('muy fuerte');
    });
  });

  describe('edge cases', () => {
    it('exactamente 8 caracteres sin números NO es "débil"', () => {
      expect(calculateStrength('abcdefgh')).not.toBe('débil');
    });

    it('exactamente 7 caracteres NO es "media"', () => {
      expect(calculateStrength('abcdefg')).not.toBe('media');
    });

    it('solo símbolos y menos de 8 caracteres sigue siendo "débil"', () => {
      expect(calculateStrength('!@#$%^')).toBe('débil');
    });
  });
});

// Calcula la fortaleza de una contraseña.
//
// Reglas (en este orden):
//   - Vacía:      password === ''                                  -> 'vacía'
//   - Débil:      length < 8                                       -> 'débil'
//   - Muy fuerte: length >= 8 && tiene número && tiene símbolo     -> 'muy fuerte'
//   - Fuerte:     length >= 8 && tiene número                      -> 'fuerte'
//   - Media:      length >= 8 (cualquier otro caso)                -> 'media'
//
// Un "símbolo" es cualquier caracter que NO sea letra ni número
// (incluye espacios, signos de puntuación, etc.).

export function calculateStrength(password) {
  if (password === '') return 'vacía';
  if (password.length < 8) return 'débil';

  const hasNumber = /\d/.test(password);
  // Símbolo = cualquier char que no sea letra (Unicode) ni número.
  const hasSymbol = /[^\p{L}\p{N}]/u.test(password);

  if (hasNumber && hasSymbol) return 'muy fuerte';
  if (hasNumber) return 'fuerte';
  return 'media';
}

# Password Strength Meter

> Un medidor de fortaleza de contraseñas hecho con **React + Vite**, construido
> desde cero siguiendo el flujo **TDD** (test-driven development).

---

## ¿Qué hace?

Escribís una contraseña en el input y, en tiempo real, te dice qué tan fuerte es,
con una barra de progreso y un texto que se actualizan a medida que tipeás.

| Fortaleza   | ¿Cuándo se muestra?                                          |
| ----------- | ------------------------------------------------------------ |
| vacía       | El input está vacío.                                          |
| débil       | Menos de 8 caracteres.                                        |
| media       | 8 o más caracteres, pero sin números ni símbolos.             |
| fuerte      | 8 o más caracteres y al menos un número.                      |
| muy fuerte  | 8 o más caracteres, al menos un número y al menos un símbolo. |

> Un **símbolo** es cualquier caracter que no sea letra ni número
> (incluye espacios, signos de puntuación, etc.).

---

## Instalación

Necesitás tener instalado [Bun](https://bun.sh/). Después, en la carpeta del
proyecto:

```bash
bun install
```

Eso descarga las dependencias y genera el `bun.lockb`.

---

## Cómo usarlo

| Comando                | Para qué sirve                                          |
| ---------------------- | ------------------------------------------------------- |
| `bun run dev`          | Abre la app en `http://localhost:5173`.                 |
| `bun test`             | Corre **todos** los tests una vez.                      |
| `bun run test:watch`   | Modo watch: re-corre los tests al guardar.              |
| `bun run coverage`     | Genera un reporte de cobertura (carpeta `coverage/`).   |
| `bun run build`        | Build de producción.                                    |

> También funciona con `bun run test` (corre Vitest con jsdom).
> Las dos formas pasan los 31 tests.

---

## Estructura del proyecto

```
src/
├── App.jsx                                  Layout principal
├── main.jsx                                 Entry de React
├── bunTestSetup.js                          Setup para `bun test` (happy-dom)
├── setupTests.js                            Setup para Vitest (jsdom)
├── styles/
│   └── global.css                           Tokens de diseño y layout global
├── lib/
│   ├── calculateStrength.js                 Lógica pura
│   └── calculateStrength.test.js            15 tests unitarios
└── components/
    ├── PasswordStrengthMeter.jsx            Componente React
    ├── PasswordStrengthMeter.css            Estilos del componente
    └── PasswordStrengthMeter.test.jsx       16 tests del componente
```

---

## El flujo TDD que seguí

El proyecto se construyó respetando el ciclo **rojo → verde → refactor**,
y eso se ve en el `git log`. Cada paso es un commit:

1. **Setup inicial** — Vite + React + Vitest + RTL + happy-dom, configurado a
   mano (sin templates pre-hechos).
2. **Tests fallidos** — Escribí los 26 tests requeridos *antes* de implementar
   nada. Commit con todos los tests en rojo (este es el commit obligatorio).
3. **Implementación de la lógica** — Escribí la función `calculateStrength`
   hasta hacer pasar los 15 tests unitarios.
4. **Implementación del componente** — Implementé el componente React hasta
   hacer pasar los 11 tests del componente. 26/26 pasando.
5. **Refactor + extras** — Agregué la barra de progreso (escribiendo los tests
   primero), los estilos y este README.


## ¿Cómo está organizado el código?

Está separado en dos piezas para que cada una sea fácil de testear y mantener:

- **Lógica pura** (`src/lib/calculateStrength.js`):
  una función simple que recibe un string y devuelve el nivel de fortaleza.
  No depende de React ni del DOM, así que se puede testear sola.

- **Componente** (`src/components/PasswordStrengthMeter.jsx`):
  el componente React. Usa `useState` para el input y delega el cálculo a
  la función pura. Sólo se encarga del UI.

---

## Tests

En total son **31 tests** y todos pasan.

**Lógica pura** (`calculateStrength`) — 15 tests:
- Casos básicos para cada nivel (vacía, débil, media, fuerte, muy fuerte).
- Edge cases: exactamente 7 y 8 caracteres, contraseñas solo de símbolos, etc.

**Componente** (`PasswordStrengthMeter`) — 16 tests:
- Renderizado: el input es un `type="password"` y existe un indicador.
- Comportamiento: lo que ve el usuario cuando escribe o borra.
- Edge cases del componente.
- Accesibilidad: el input está asociado a un label.
- Barra de progreso: atributos ARIA y valor numérico correcto por nivel.

Los tests usan **`userEvent`** para simular tipeo real, y queries por **label**
o **rol**, no por clase ni por test-id, así no se acoplan al HTML interno.


## Puntos extra implementados

- [x] Test que verifica que el input es accesible por **label**.
- [x] **Barra de progreso** visual con sus tests correspondientes
      (atributos ARIA y valores por nivel).
- [x] **Coverage** configurado con Vitest (provider v8, reporte HTML + LCOV).
- [x] **`bun test`** funcional con happy-dom además de `bun run test` con Vitest.
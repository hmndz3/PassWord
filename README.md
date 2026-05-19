# Password Strength Meter

Proyecto de práctica TDD con React + Vite + Vitest + React Testing Library.

> Estado: **setup inicial (commit 1)**. La implementación se construirá
> escribiendo primero los tests, siguiendo el flujo red-green-refactor.

## Stack

- [Vite](https://vitejs.dev/) + plugin React
- [Vitest](https://vitest.dev/) como test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [jsdom](https://github.com/jsdom/jsdom) como entorno de testing

## Instalación

```bash
bun install
# o npm install / pnpm install / yarn
```

## Scripts

| Script         | Descripción                                  |
| -------------- | -------------------------------------------- |
| `bun run dev`  | Levanta el servidor de desarrollo de Vite.   |
| `bun test`     | Corre todos los tests una vez con Vitest.    |
| `bun run test:watch` | Modo watch de Vitest.                  |
| `bun run coverage` | Genera reporte de cobertura con v8.      |
| `bun run build` | Build de producción.                        |

## Flujo TDD

Este proyecto se construye estrictamente con el siguiente flujo:

1. Configurar el proyecto (este commit).
2. Escribir todos los tests primero (deben fallar).
3. Commit con tests en rojo.
4. Implementar hasta que todos los tests pasen.
5. Refactorizar manteniendo los tests en verde.

// Setup para `bun test`:
//  1) Registra happy-dom como entorno (window, document, etc.).
//  2) Extiende `expect` con los matchers de jest-dom
//     (toBeInTheDocument, toHaveTextContent, toHaveAttribute, ...).
//
// Vitest tiene su propio setup en `src/setupTests.js`.

import { GlobalRegistrator } from '@happy-dom/global-registrator';
GlobalRegistrator.register();

import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'bun:test';
expect.extend(matchers);

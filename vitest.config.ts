import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      exclude: ['**/next.config.mjs', '**/setupTest.ts', '.next/**'],
    },
  },
});

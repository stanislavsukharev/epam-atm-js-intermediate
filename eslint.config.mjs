import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPlaywright from 'eslint-plugin-playwright'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  {
    ignores: ['node_modules', 'playwright-report', 'results', 'test-results'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'warn',
      "no-console": 'off',
      eqeqeq: ['error', 'always'],
      curly: ['warn', 'all'],
    },
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.spec.ts'],
    plugins: {
      playwright: eslintPluginPlaywright,
    },
    rules: {
      ...eslintPluginPlaywright.configs.recommended.rules,
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
    },
  },
])

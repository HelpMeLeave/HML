import NextPlugin from '@next/eslint-plugin-next'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': NextPlugin,
    },
    rules: {
      ...NextPlugin.configs.recommended.rules,
    },
  },
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // '@types/**',
    './src/_config/payload-generated-schema.ts',
    './src/migrations/**',
    '.claude/**',
  ]),
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
])

export default eslintConfig

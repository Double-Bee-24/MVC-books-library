export default {
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: {
      node: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    eqeqeq: ['error', 'always'],
    'no-undef': 'error',
    indent: ['error', 2],
    semi: ['error', 'always'],
  },
};

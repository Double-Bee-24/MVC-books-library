import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier'; // Import the prettier config

export default [
  // Base configurations included directly
  js.configs.recommended, // Use recommended JS rules
  ...tseslint.configs.strict, // Spread strict TypeScript recommended rules

  // Custom configuration for .js files (if any overrides are needed)
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // Only include Node.js globals
      },
    },
    rules: {
      // Add or override JS-specific rules here
      'no-console': 'warn',
    }
  },

  // Custom configuration for .ts files (if any overrides are needed)
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node, // Only include Node.js globals
      },
      parserOptions: {
        project: './tsconfig.json', // Specify your tsconfig for type-aware rules
      },
    },
    // Plugins are typically defined where their rules are used, or globally if they provide configurations to spread
    // We'll define import plugin in the common section where import rules are applied to both js and ts.
    rules: {
      // Add or override TS-specific rules here
      'no-console': 'warn', // Keep console warning
      // Override rules from strict config for more strictness
      '@typescript-eslint/no-explicit-any': 'error', // Disallow 'any' type
      // Note: Many strict rules are now included from ...tseslint.configs.strict
    },
  },

  // Common rules for all files (JS and TS) including import rules
  {
    files: ['src/**/*.{js,ts,mjs,cjs}'],
    ignores: ['**/*.d.ts'], // Ignore declaration files
    plugins: {
        import: importPlugin, // Add the import plugin here
        // Other plugins used by common rules
    },
    rules: {
      // Import sorting rules from eslint-plugin-import
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always', // Add a newline between import groups
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true }, // Alphabetize imports within groups
        },
      ],
       'import/newline-after-import': 'error', // Enforce a newline after the last import
       'import/no-duplicates': 'error', // Prevent duplicate import statements
       // Consider 'import/no-unresolved' if needed
    },
  },

  // Prettier integration (MUST be the LAST config to avoid conflicts)
  // The 'prettier' object from 'eslint-config-prettier' is a flat config object itself.
  prettier,
];

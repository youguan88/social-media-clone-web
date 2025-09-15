import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/', '.next/', 'next-env.d.ts'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  
  ...tseslint.configs.recommended,
  
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReactConfig,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  
  prettierConfig,
];
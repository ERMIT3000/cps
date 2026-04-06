import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        Swiper: 'readonly',
      },
    },
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['webpack.config.js', 'postcss.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
];

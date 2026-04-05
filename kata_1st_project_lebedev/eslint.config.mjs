import js from '@eslint/js';
import globals from 'globals';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const prettierRecommended = require('eslint-plugin-prettier/recommended');

export default [
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'webpack.config.js',
            'postcss.config.js',
        ],
    },
    js.configs.recommended,
    {
        files: ['js/**/*.js', 'src/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.browser,
                Swiper: 'readonly',
            },
            ecmaVersion: 2022,
            sourceType: 'module',
        },
    },
    {
        ...prettierRecommended,
        files: ['js/**/*.js', 'src/**/*.js'],
    },
];

import jsEslint from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import configPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import espree from 'espree'
import globals from 'globals'
import tsEslint, { type ConfigWithExtends } from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

const configVueTsParser: ConfigWithExtends = {
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: {
        js: espree,
        ts: tsEslint.parser,
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
}
export default tsEslint.config(
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  // ...tsEslint.configs.stylistic,
  ...(pluginVue.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray),
  configVueTsParser,
  configPrettier as TSESLint.FlatConfig.Config,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // TS already checks for that, and Typescript-Eslint recommends to disable it
      // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',

      eqeqeq: ['warn', 'always', { null: 'ignore' }],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',

      'sort-vars': 'warn',

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    ignores: ['dist', 'dev-dist', 'public', 'src-tauri'],
  },
)

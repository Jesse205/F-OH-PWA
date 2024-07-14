import jsEslint from '@eslint/js'
import configPrettier from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

const configVueTs = {
  files: ['*.ts', '*.cts', '*.mts', '*.tsx', '*.vue'],
  rules: {
    // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',
    // TS already checks for that, and Typescript-Eslint recommends to disable it
    // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  extends: [...pluginVue.configs['flat/essential'], ...tsEslint.configs.recommended],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsEslint.parser,
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
  configVueTs,
  configPrettier,
  {
    rules: {
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
    },
  },
  {
    ignores: ['dist', 'dev-dist', 'public', 'src-tauri'],
  },
)

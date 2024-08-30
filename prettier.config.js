/**
 * @type {import('prettier').Config}
 */
export default {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  quoteProps: 'as-needed',
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  // plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.vue'],
      options: {
        singleQuote: true,
      },
    },
  ],
}

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'block-no-empty': null,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':export'],
      },
    ],
    'selector-class-pattern': '[a-z0-9\\-_]',
    'no-empty-source': null,
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export'],
      },
    ],
  },
}

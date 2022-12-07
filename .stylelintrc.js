module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
  ],
  rules: {
    // Do not use a browser prefix that is already supported by autoprefixer‰
    'at-rule-no-unknown': [
      null,
      { 'ignoreAtRules': ['tailwind'] }
    ],
    'scss/at-rule-no-unknown': [
      null,
      { 'ignoreAtRules': ['tailwind'] }
    ],
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'function-no-unknown': null,
    'max-line-length': null,
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': null,
    'selector-pseudo-class-no-unknown': null,
    'no-invalid-position-at-import-rule': null,
    'selector-class-pattern': '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$|^Mui.*$',
    'declaration-block-no-duplicate-properties': true,
    'scss/dollar-variable-pattern': null
  },
  ignoreFiles: [
    'dist/**/*'
  ],
  customSyntax: "postcss-html"
}

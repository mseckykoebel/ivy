module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "tsdoc/syntax": "off",
    // all of these are being suppressed - TODO is to deal with them later
    "no-unused-vars": ["off", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["off"],
    "indent": ["off", 2]
  },
  env: {
    node: true
  }
};
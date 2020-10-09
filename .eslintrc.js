module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9
  },

  plugins: [],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['warn', 'always'],
    semi: ['error', 'always'],
    'new-cap': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-mixed-spaces-and-tabs': 2,
    'no-use-before-define': [2, 'nofunc'],
    'no-unreachable': ['warn'],
    'no-unused-vars': ['warn'],
    'no-extra-parens': ['off'],
    'no-mixed-operators': ['off'],
    quotes: [2, 'single', 'avoid-escape'],
    'block-scoped-var': 2,
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'computed-property-spacing': [2, 'never'],
    'keyword-spacing': 2,
    'space-unary-ops': 2,
    'max-len': ['warn', { 'code': 140 }]
  }
};

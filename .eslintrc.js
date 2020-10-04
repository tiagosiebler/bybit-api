module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9
  },

  plugins: ['jest', 'prettier'],
  rules: {
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: true,
    //     printWidth: 140,
    //     arrowParens: 'avoid'
    //   }
    // ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'array-bracket-spacing': ['error', 'never'],
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['warn', 'always'],
    quotes: ['error', 'single'],
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

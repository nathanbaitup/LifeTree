// ESLINT FILE FROM: https://github.com/jscomplete/advanced-react/blob/master/.eslintrc.js
// This eslint file was selected as it uses the babel eslint with the recommended eslint and react rules. 

module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
    'jest': true,
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [ 'react' ],
  'rules': {
    'react/prop-types': ['off'],
    'linebreak-style': ['error','unix'],
    'quotes': ['error','single'],
    'semi': ['error','always'],
    'no-console': ['warn', { 'allow': ['info', 'error'] }]
  }
};
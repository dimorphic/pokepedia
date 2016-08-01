// statuses
const OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  env: {
    es6: true,
    browser: true,
    commonjs: true
  },

  extends: 'airbnb',
  parser: 'babel-eslint',
  globals: {},

  rules: {
    'global-require': WARN,
    'arrow-body-style': [WARN, 'always'],
    'comma-dangle': [ERROR, 'never'],
    'import/no-mutable-exports': WARN,
    'import/no-unresolved': OFF,
    'quote-props': [ERROR, 'consistent-as-needed'],
    'no-console': OFF,
    'no-unused-vars': [WARN, { args: 'after-used' }],
    'react/wrap-multilines': OFF,
    'react/jsx-no-bind': OFF,
    'react/prefer-stateless-function': OFF
  },

  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': {
      webpack: {
        config: 'start.js'
      }
    }
  }
};

// statuses
const OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  root: true,

  env: {
    es6: true,
    node: true
  },

  extends: 'airbnb',
  parser: 'babel-eslint',
  globals: {},

  rules: {
    'new-cap': OFF,
    'global-require': OFF,
    'camelcase': WARN,
    'import/imports-first': WARN,
    'no-console': OFF,
    'no-void': WARN,
    'arrow-body-style': [WARN, 'always'],
    'comma-dangle': [ERROR, 'never'],
    'import/no-named-as-default-member': WARN,
    'import/no-mutable-exports': WARN,
    'import/newline-after-import': WARN,
    'import/imports-first': OFF,
    'import/no-extraneous-dependencies': WARN,
    'quote-props': [ERROR, 'consistent-as-needed'],
    'prefer-template': OFF,
    'no-param-reassign': WARN,
    'no-unused-vars': [WARN, { vars: 'local', args: 'none' }],
    'no-use-before-define': [ERROR, 'nofunc']
  },

  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': 'node'
  }
};

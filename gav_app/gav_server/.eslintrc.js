module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
  },
};

module.exports = {
  root: true,
  extends: ['../../.eslintrc.js'],
  env: {
    browser: true,
    es2022: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@packages/eslint-config/react.json', 'plugin:storybook/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-redeclare': 'off'
  }
}

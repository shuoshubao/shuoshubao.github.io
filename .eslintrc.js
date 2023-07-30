const { getESLintConfig } = require('@nbfe/standard')

module.exports = getESLintConfig(['react'], {
  rules: {
    'import/order': [0],
    'sonarjs/no-duplicate-string': [0],
    'react/react-in-jsx-scope': [0]
  }
})

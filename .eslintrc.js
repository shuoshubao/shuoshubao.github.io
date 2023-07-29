const { getESLintConfig } = require('@nbfe/standard')

module.exports = getESLintConfig(['react'], {
  rules: {
    'sonarjs/no-duplicate-string': [0],
    'react/react-in-jsx-scope': [0]
  }
})

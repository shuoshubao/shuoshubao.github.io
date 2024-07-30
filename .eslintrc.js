/*
 * @Author: shuoshubao
 * @Date: 2023-10-07 16:19:06
 * @LastEditors: shuoshubao
 * @LastEditTime: 2024-07-30 13:43:54
 * @Description:
 */
const { getESLintConfig } = require('@nbfe/standard')

module.exports = getESLintConfig(['react'], {
  rules: {
    'import/order': [0],
    'sonarjs/no-duplicate-string': [0],
    'react/react-in-jsx-scope': [0],
    'no-await-in-loop': [0]
  }
})

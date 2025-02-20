/*
 * @Author: shuoshubao
 * @Date: 2025-02-20 12:34:50
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-02-20 12:37:02
 * @Description:
 */
const { getESLintConfig } = require('@nbfe/standard');

module.exports = getESLintConfig(['react'], {
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'import/order': [0],
        'sonarjs/no-duplicate-string': [0],
        'react/react-in-jsx-scope': [0],
        'no-await-in-loop': [0]
    }
});

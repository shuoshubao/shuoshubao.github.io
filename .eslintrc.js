/* eslint-disable */

module.exports = {
    extends: ['eslint:recommended', 'plugin:vue/base', 'airbnb-base'],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
    },
    plugins: ['prettier', 'html', 'import'],
    env: {
        browser: true,
        node: true,
    },
    globals: {},
    rules: {
        'prettier/prettier': [2],
        indent: [2, 4, { SwitchCase: 1 }], // 缩进
        'max-len': [0], // 一行最大的代码量
        'import/no-unresolved': [0],
        'global-require': [0],
        'import/no-dynamic-require': [0],
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: true,
                peerDependencies: true,
            },
        ],
    },
};

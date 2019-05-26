module.exports = {
    parser: 'babel',
    arrowParens: 'avoid',
    bracketSpacing: true,
    insertPragma: false,
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 160,
    proseWrap: 'never',
    requirePragma: false,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
    overrides: [
        {
            files: '*.json',
            options: {
                parser: 'json',
                tabWidth: 2,
            },
        },
        {
            files: '*.scss',
            options: {
                parser: 'css',
                singleQuote: false,
            },
        },
        {
            files: '*.vue',
            options: {
                parser: 'vue',
            },
        },
    ],
};

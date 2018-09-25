const prettier = require('prettier/standalone');
const babylonPlugin = require('prettier/parser-babylon');

const prettierOptions = {
    useTabs: false,
    tabWidth: 4,
    printWidth: 80,
    singleQuote: true,
    semi: true,
    trailingComma: 'none',
    bracketSpacing: false,
    arrowParens: 'avoid',
    parser: 'babylon'
};

const format = source => {

    return prettier.format(source, {
        parser: 'babylon',
        plugins: [babylonPlugin],
        ...prettierOptions
    });
};

export default format;

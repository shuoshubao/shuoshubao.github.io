// import prettier from 'prettier/standalone';
const prettier = require('prettier/standalone');
const babylonPlugin = require('prettier/parser-babylon');
// import htmlparser from 'htmlparser2';

const format = source => {

    return prettier.format(source, {
        parser: 'babylon',
        plugins: [babylonPlugin]
    });
};

export default format;

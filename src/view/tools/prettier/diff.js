const jsdiff = require('diff');

const diff = (sourceCode, formatCode) => {
    const diffText = jsdiff.diffChars(sourceCode, formatCode).reduce((prev, cur) => {
        const {added, removed, value} = cur;
        const color = added ? 'success' : removed ? 'danger' : 'info';
        const text = `<span class="text-${color}">${value}</span>`;
        return prev += text
    }, '');
    return `<pre>${diffText}</pre>`;
};

export default diff;

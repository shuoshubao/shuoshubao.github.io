var hljs = require('./highlight');

hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('php', require('./languages/php'));

module.exports = hljs;

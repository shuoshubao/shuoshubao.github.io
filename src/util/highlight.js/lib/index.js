var hljs = require('./highlight')

const languages = ['xml', 'css', 'javascript', 'php', 'json', 'markdown']

languages.forEach(v => hljs.registerLanguage(v, require(`./languages/${v}`)))

module.exports = hljs

import { kebabCase } from 'lodash-es'
import MarkdownIt from 'markdown-it/dist/markdown-it'
import getTocData from 'mdx-toc'
import TaskLists from 'markdown-it-task-lists'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItLinkAttrs from 'markdown-it-link-attributes'
import MarkdownItContainer from 'markdown-it-container'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import plaintext from 'highlight.js/lib/languages/plaintext'
import shell from 'highlight.js/lib/languages/shell'
import bash from 'highlight.js/lib/languages/bash'
import php from 'highlight.js/lib/languages/php'
import { getHashs } from './route'
import MarkdownItMermaid from './mermaid'
import MarkdownItKaTeX from './katex'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('less', less)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('php', php)

const slugify = str => {
  return [getHashs().join('/'), encodeURIComponent(kebabCase(str))].join('#')
}

export const MarkdownItHighlight = MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    const trimedStr = str.trim()
    if (lang && hljs.getLanguage(lang)) {
      try {
        const { value } = hljs.highlight(trimedStr, { language: lang })
        return [
          '<pre style="background: rgb(24, 24, 27);">',
          `<code class="hljs language-${lang}" lang="${lang}">`,
          value.split('\n').map((v, i, arr) => {
            return `<div ${arr.length < 5 ? '' : 'class="line"'}>${v}</div>`
          }),
          '<span class="markdown-code-btns">',
          `<span class="btn-lang">${lang}</span>`,
          `<span data-code="${encodeURIComponent(
            trimedStr
          )}" class="anticon anticon-copy"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg></span>`,
          '</span>',
          '</code>',
          '</pre>'
        ]
          .flat()
          .join('')
      } catch (__) {}
    }
    return `<pre><code class="language-${lang}">${trimedStr}</code></pre>`
  }
})
  .use(TaskLists)
  .use(MarkdownItAttrs)
  .use(MarkdownItContainer, 'alert', {
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        const text = tokens[idx].info.trim()
        const [type, ...tips] = text.split(/\s+/).slice(1)
        const message = tips.join(' ')
        const types = ['success', 'info', 'warning', 'error']
        return [
          `<div class="markdown-it-alert markdown-it-alert-${types.includes(type) ? type : 'info'}">`,
          '<span class="markdown-it-alert-icon"><svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg></span>',
          '<div class="markdown-it-alert-content">',
          message ? `<div class="markdown-it-alert-message">${message}</div>` : '',
          '<div class="markdown-it-alert-description">'
        ].join('\n')
      } else {
        return '</div></div></div>'
      }
    }
  })
  .use(MarkdownItAnchor, {
    slugify
  })
  .use(MarkdownItLinkAttrs, {
    matcher: href => href.startsWith('http'),
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  })
  .use(MarkdownItMermaid)
  .use(MarkdownItKaTeX)

const parser = md => {
  return MarkdownIt().render(md)
}

export const getMarkdownTocData = md => {
  return getTocData(parser(md), {
    parser,
    slugify
  })
}

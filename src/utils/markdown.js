import { kebabCase } from 'lodash-es'
import MarkdownIt from 'markdown-it'
import TaskLists from 'markdown-it-task-lists'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItAnchor from 'markdown-it-anchor'
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
import { getHashs } from '.'

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

export const slugify = str => {
  return [getHashs().join('/'), encodeURIComponent(kebabCase(str))].join('#')
}

export const MarkdownItHighlight = MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const { value } = hljs.highlight(str.trim(), { language: lang })
        return [
          '<pre style="background: rgb(24, 24, 27);">',
          `<code class="hljs language-${lang}" lang="${lang}">`,
          value.split('\n').map((v, i, arr) => {
            return `<div ${arr.length < 5 ? '' : 'class="line"'}>${v}</div>`
          }),
          '<span class="markdown-code-btns">',
          `<span class="btn-lang">${lang}</span>`,
          '<span role="img" aria-label="copy" class="anticon anticon-copy"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg></span>',
          '</span>',
          '</code>',
          '</pre>'
        ]
          .flat()
          .join('')
      } catch (__) {}
    }

    return `<pre><code class="language-${lang}">${str.trim()}</code></pre>`
  }
})
  .use(TaskLists)
  .use(MarkdownItAttrs)
  .use(MarkdownItAnchor, {
    slugify
  })

const stringToFragment = string => {
  const renderer = document.createElement('template')
  renderer.innerHTML = string
  return renderer.content
}

const getHeaders = (content, type) => {
  const html = type === 'html' ? content : MarkdownIt().render(content)

  const fragment = stringToFragment(html.trim())

  return [...fragment.children]
    .filter(v => {
      return Array(6)
        .fill(0)
        .map((v2, i) => ['H', i + 1].join(''))
        .includes(v.tagName)
    })
    .map(v => {
      const { tagName, innerText } = v
      const level = Number(tagName.slice(1))
      return {
        level,
        title: innerText
      }
    })
}

export const getTocData = ({ content, type }) => {
  const headers = getHeaders(content, type)

  const headersMd = headers
    .map(v => {
      const { level, title } = v
      return ['  '.repeat(level), '*', title].join(' ')
    })
    .join('\n')

  const toc = MarkdownIt().render(headersMd).trim()

  const recursion = node => {
    const children = [...node.children]
    if (children.filter(v => v.nodeType === 1).length) {
      const title = node.firstChild.nodeValue.trim()
      return {
        title,
        key: slugify(title),
        children: (node.firstElementChild.tagName === 'UL' ? [...node.firstElementChild.children] : children).map(v => {
          return recursion(v)
        })
      }
    }
    const { innerText } = node
    return {
      title: innerText,
      key: slugify(innerText),
      children: []
    }
  }

  const fragment = stringToFragment(toc)

  return {
    list: headers,
    markdown: headersMd,
    html: toc,
    treeData: recursion(fragment.firstChild).children
  }
}

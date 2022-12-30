import { map } from 'lodash-es'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import shell from 'highlight.js/lib/languages/shell'
import bash from 'highlight.js/lib/languages/bash'
import php from 'highlight.js/lib/languages/php'

export const isDark = () => {
  const { matchMedia } = window
  return matchMedia('(prefers-color-scheme: dark)').matches
}

export const addListenerPrefersColorScheme = callback => {
  const { matchMedia } = window
  matchMedia('(prefers-color-scheme: dark)').addListener(mediaQueryList => {
    callback(mediaQueryList.matches)
  })
  matchMedia('(prefers-color-scheme: light)').addListener(mediaQueryList => {
    callback(!mediaQueryList.matches)
  })
}

export const NavData = [
  {
    label: 'Home',
    value: 'index'
  },
  {
    label: 'JS',
    value: 'js'
  },
  {
    label: 'Node',
    value: 'node'
  },
  {
    label: 'HTML',
    value: 'html'
  },
  {
    label: 'CSS',
    value: 'css'
  },
  {
    label: 'Tool',
    value: 'tool'
  },
  {
    label: 'Assemble',
    value: 'assemble'
  }
]

export const getHashs = () => {
  return window.location.hash.slice(1).split('/').filter(Boolean)
}

export const getPageType = () => {
  const hashs = getHashs()
  const [category, articleName] = hashs
  if (hashs.length === 0) {
    return 'index'
  }
  if (!map(NavData.slice(1), 'value').includes(category)) {
    return '404'
  }
  if (hashs.length === 1) {
    return 'list'
  }
  if (hashs.length === 2) {
    return 'detail'
  }
  return '404'
}

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('less', less)
hljs.registerLanguage('json', json)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('php', php)

export const MarkdownItHighlight = MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const { code, value } = hljs.highlight(str.trim(), { language: lang })
        return [
          '<pre>',
          `<code class="hljs language-${lang}" lang="${lang}">`,
          ...value.split('\n').map(v => {
            return `<div class="line">${v}</div>`
          }),
          '<span class="markdown-code-btns">',
          `<span class="btn-lang">${lang}</span>`,
          '<span role="img" aria-label="copy" class="anticon anticon-copy"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg></span>',
          '</span>',
          '</code>',
          '</pre>'
        ].join('')
      } catch (__) {}
    }

    return ''
  }
})

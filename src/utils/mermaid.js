/* eslint-disable */

// code from https://github.com/liradb2000/markdown-it-mermaid/blob/master/src/index.js

import Mermaid from 'mermaid'
import Murmur from 'murmurhash-js/murmurhash3_gc'

const htmlEntities = str => {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const MermaidChart = code => {
  try {
    const needsUniqueId = `render${Murmur(code, 42).toString()}`
    Mermaid.mermaidAPI.render(needsUniqueId, code, sc => {
      code = sc
    })
    return `<div class="mermaid">${code}</div>`
  } catch (err) {
    return `<pre>${htmlEntities(err.name)}: ${htmlEntities(err.message)}</pre>`
  }
}

const defaultOpts = {
  startOnLoad: false,
  securityLevel: 'true',
  theme: 'default',
  flowchart: {
    htmlLabels: false,
    useMaxWidth: true
  },
  dictionary: {
    token: 'mermaid'
  }
}

export default (md, options) => {
  const option = {
    ...defaultOpts,
    ...options
  }

  const { token: _token = 'mermaid', ...dictionary } = option.dictionary
  Mermaid.initialize(option)

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules)

  const replacer = (_, p1, p2, p3) => {
    p1 = dictionary[p1] ?? p1
    p2 = dictionary[p2] ?? p2
    return p2 === '' ? `${p1}\n` : `${p1} ${p2}${p3}`
  }

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (token.info.trim() === _token) {
      return MermaidChart(code.replace(/(.*?)[ \n](.*?)([ \n])/, replacer))
    }
    return defaultRenderer(tokens, idx, opts, env, self)
  }
}

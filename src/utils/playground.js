import prettier from 'prettier'
import babelParser from 'prettier/parser-babel'
import cssParser from 'prettier/parser-postcss'
import htmlParser from 'prettier/parser-html'
import PrettierConfig from '@nbfe/standard/prettier.config'
import axios from 'axios'
import { uniqueId } from 'lodash'
import { VercelApiPrefix } from '@/configs'
import InjectJS from './inject.js?raw'

export const PlaygroundStore = new Map()

// test
window.PlaygroundStore = PlaygroundStore

const formatCode = (code, lang) => {
  if (lang === 'babel') {
    return prettier.format(code, {
      parser: lang,
      plugins: [babelParser],
      ...PrettierConfig
    })
  }
  if (['css', 'less', 'scss'].includes(lang)) {
    return prettier.format(code, {
      parser: lang,
      plugins: [cssParser],
      ...PrettierConfig
    })
  }
  if (lang === 'html') {
    return prettier.format(code, {
      parser: lang,
      plugins: [htmlParser],
      ...PrettierConfig
    })
  }
  return code
}

export const parsePlayground = str => {
  const id = uniqueId('playground-container-')

  const StyleTagName = 'style'
  const MarkupTagName = 'template'
  const ScriptTagName = 'script'

  const result = {
    html: '',
    css: {
      type: 'css',
      text: ''
    },
    js: ''
  }

  const renderer = document.createElement('template')
  renderer.innerHTML = str

  const { content: fragment } = renderer

  Array.from(fragment.children).forEach(v => {
    const { localName, type, innerHTML } = v
    if (localName === StyleTagName) {
      const cssType = type ? type.split('/')[1] : 'css'
      result.css = {
        type: cssType,
        text: formatCode(innerHTML, cssType)
      }
    }
    if (localName === MarkupTagName) {
      result.html = formatCode(innerHTML, 'html')
    }
    if (localName === ScriptTagName) {
      result.js = formatCode(innerHTML, 'babel')
    }
  })

  PlaygroundStore.set(id, result)

  return id
}

const getCssCode = async (css, cssType) => {
  if (!css.length) {
    return ''
  }
  if (cssType === 'less') {
    const res = await axios.post(`${VercelApiPrefix}/api/compiler/less`, {
      code: css
    })
    return res.data.data.css
  }
  if (cssType === 'sass') {
    const res = await axios.post(`${VercelApiPrefix}/api/compiler/sass`, {
      code: css
    })
    return res.data.data.css
  }
  return css
}

const injectReact = js => {
  let jsCode
  if (js.includes('export default')) {
    jsCode = [
      js.replace('export default', 'const App = '),
      'ReactDOM.createRoot(document.querySelector("#app")).render(<App />);'
    ].join('\n')
  } else {
    jsCode = js
  }

  return InjectJS.replace('jsCode', jsCode)
}

export const createIframe = id => {
  const { html, css, js } = PlaygroundStore.get(id)
  const iframe = document.createElement('iframe')

  iframe.name = id

  iframe.addEventListener('load', async () => {
    const frameWin = iframe.contentWindow
    const frameDoc = frameWin.document

    const injectCss = () => {
      const link = frameDoc.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/antd@5.7.1/dist/reset.css'
      frameDoc.head.appendChild(link)
    }

    const injectJs = () => {
      const script = frameDoc.createElement('script')

      script.innerHTML = injectReact(js)

      frameDoc.body.appendChild(script)
    }

    injectCss()

    if (js) {
      injectJs()
    }

    if (css.text) {
      const style = frameDoc.createElement('style')

      style.innerHTML = await getCssCode(css.text, css.type)

      frameDoc.head.appendChild(style)
    }

    // 注入 html
    frameDoc.body.insertAdjacentHTML('afterbegin', html || '<div id="app"></div>')

    setInterval(() => {
      const innerHeight = Number(frameWin.document.querySelector('#app')?.scrollHeight)
      if (iframe.height !== innerHeight) {
        iframe.height = innerHeight
      }
    }, 1e3)
  })
  return iframe
}

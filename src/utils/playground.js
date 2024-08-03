import antdResetCss from 'antd/dist/reset.css?inline'
import less from 'less'
import prettier from 'prettier'
import babelParser from 'prettier/parser-babel'
import htmlParser from 'prettier/parser-html'
import cssParser from 'prettier/parser-postcss'
import { v4 as uuidv4 } from 'uuid'
import InjectJS from './inject.js?raw'

export const PrettierConfig = {
  printWidth: 160,
  useTabs: false,
  tabWidth: 4,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  proseWrap: 'never',
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'ignore'
}

export const PlaygroundStore = new Map()

export const formatCode = (code, lang) => {
  if (lang === 'js') {
    return prettier.format(code, {
      parser: 'babel',
      plugins: [babelParser],
      ...PrettierConfig
    })
  }
  if (['css', 'less'].includes(lang)) {
    return prettier.format(code, {
      parser: 'less',
      plugins: [cssParser],
      ...PrettierConfig
    })
  }
  if (lang === 'html') {
    return prettier.format(code, {
      parser: 'html',
      plugins: [htmlParser],
      ...PrettierConfig
    })
  }
  return code
}

export const parsePlayground = str => {
  const id = uuidv4()

  const StyleTagName = 'style'
  const MarkupTagName = 'template'
  const ScriptTagName = 'script'

  const result = {
    html: '',
    css: '',
    cssAssets: [],
    js: '',
    jsAssets: []
  }

  const renderer = document.createElement('template')

  renderer.innerHTML = str

  const { content: fragment } = renderer

  Array.from(fragment.children).forEach(v => {
    const { localName, innerHTML, dataset } = v
    const assets = (dataset.assets || '').split(';').filter(Boolean)
    if (localName === StyleTagName) {
      result.css = formatCode(innerHTML, 'css')
      result.cssAssets = assets
    }
    if (localName === MarkupTagName) {
      result.html = formatCode(innerHTML, 'html')
    }
    if (localName === ScriptTagName) {
      result.js = formatCode(innerHTML, 'js')
      result.jsAssets = assets
    }
  })

  PlaygroundStore.set(id, result)

  return id
}

const getCssCode = async css => {
  if (!css.length) {
    return ''
  }
  const res = await less.render(css)
  return res.css
}

const injectReact = ({ PlaygroundStartTime, js, jsAssets }) => {
  let jsCode
  if (js.includes('export default')) {
    jsCode = [
      js.replace('export default', 'const PlaygroundApp = '),
      'ReactDOM.createRoot(document.querySelector("#app")).render(<PlaygroundApp />);'
    ].join('\n')
  } else {
    jsCode = js
  }

  return InjectJS.replace('__JsCode__', btoa(encodeURIComponent(jsCode)))
    .replaceAll('PlaygroundStartTime', PlaygroundStartTime)
    .replaceAll('PlaygroundJsAssets', JSON.stringify(jsAssets))
}

const loadStyleText = (doc, text) => {
  const style = doc.createElement('style')
  style.innerHTML = text
  doc.head.appendChild(style)
}

const loadStyle = (doc, src) => {
  const link = doc.createElement('link')
  link.rel = 'stylesheet'
  link.href = src
  doc.head.appendChild(link)
}

export const createIframe = id => {
  const PlaygroundStartTime = Date.now()
  const { html, css, cssAssets, js, jsAssets } = PlaygroundStore.get(id)
  const iframe = document.createElement('iframe')

  iframe.name = id

  iframe.addEventListener('load', async () => {
    const frameWin = iframe.contentWindow
    const frameDoc = frameWin.document

    const injectCss = () => {
      cssAssets.forEach(v => {
        loadStyle(frameDoc, v)
      })
    }

    const injectJs = () => {
      const script = frameDoc.createElement('script')

      script.innerHTML = injectReact({ PlaygroundStartTime, js, jsAssets })

      frameDoc.body.appendChild(script)
    }

    // 注入 css
    injectCss()
    loadStyleText(frameDoc, antdResetCss)

    if (css) {
      const cssText = await getCssCode(css)
      loadStyleText(frameDoc, cssText)
    }

    // 注入 html
    frameDoc.body.insertAdjacentHTML('afterbegin', html || '<div id="app"></div>')

    // 注入 js
    if (js) {
      injectJs()
    } else {
      frameWin.parent.postMessage(
        {
          type: 'playground',
          id,
          eventName: 'initialized',
          initializedTime: Date.now() - PlaygroundStartTime
        },
        '/'
      )
    }

    setInterval(() => {
      const innerHeight = Number(frameWin.document.body.scrollHeight)
      if (iframe.height !== innerHeight) {
        iframe.style.height = [innerHeight, 'px'].join('')
      }
    }, 1e3)
  })
  return iframe
}

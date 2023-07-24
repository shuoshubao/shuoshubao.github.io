import less from 'less'
import InjectJS from './inject.js?raw'

export const parsePlayground = str => {
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
      result.css = {
        type: type ? type.split('/')[1] : 'css',
        text: innerHTML.trim()
      }
    }
    if (localName === MarkupTagName) {
      result.html = innerHTML.trim()
    }
    if (localName === ScriptTagName) {
      result.js = innerHTML.trim()
    }
  })

  return result
}

const getCssCode = input => {
  if (input.length <= 1) {
    return ''
  }
  return new Promise(resolve => {
    less.render(input, (err, result) => {
      if (err) {
        resolve(input)
      }
      resolve(result.css)
    })
  })
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

export const createIframe = (el, { id, html, css, js }) => {
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

    if (css) {
      const style = frameDoc.createElement('style')

      style.innerHTML = await getCssCode(css)
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
  el.insertAdjacentElement('afterend', iframe)
}

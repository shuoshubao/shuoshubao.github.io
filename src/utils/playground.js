import less from 'less'

export const parsePlayground = str => {
  const MarkupTagName = 'body'
  const StyleTagName = 'style'
  const ScriptTagName = 'script'

  let html = ''
  if (str.includes(`<${MarkupTagName}>`)) {
    html = str
      .slice(str.indexOf(`<${MarkupTagName}>`) + MarkupTagName.length + 2, str.indexOf(`</${MarkupTagName}>`))
      .trim()
  }
  let css = ''
  if (str.includes(`<${StyleTagName}>`)) {
    css = str
      .slice(str.indexOf(`<${StyleTagName}>`) + StyleTagName.length + 2, str.indexOf(`</${StyleTagName}>`))
      .trim()
  }
  let script = ''
  if (str.includes(`<${ScriptTagName}>`)) {
    script = str
      .slice(str.indexOf(`<${ScriptTagName}>`) + ScriptTagName.length + 2, str.indexOf(`</${ScriptTagName}>`))
      .trim()
  }
  return {
    html: html.trim(),
    css: css.trim(),
    script: script.trim()
  }
}

const getCssCode = input => {
  return new Promise(resolve => {
    less.render(input, (err, result) => {
      resolve(result.css)
    })
  })
}

export const createIframe = (el, { html, css, js }) => {
  const iframe = document.createElement('iframe')
  iframe.addEventListener('load', async () => {
    const frameWin = iframe.contentWindow
    const frameDoc = frameWin.document

    if (css.length > 1) {
      const style = frameDoc.createElement('style')
      style.innerHTML = await getCssCode(css)
      frameDoc.head.appendChild(style)
    }
    if (js.length > 1) {
      const script = frameDoc.createElement('script')
      script.innerHTML = js
      frameDoc.body.appendChild(script)
    }
    if (html.length > 1) {
      frameDoc.body.innerHTML = html
    }

    setTimeout(() => {
      iframe.height = frameWin.document.documentElement.scrollHeight
    }, 0)
  })
  el.insertAdjacentElement('afterend', iframe)
}

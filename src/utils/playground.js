export const parsePlayground = str => {
  const MarkupTagName = 'Markup'
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

export const createIframe = (id, { html, css, js }) => {
  const iframe = document.createElement('iframe')
  iframe.addEventListener('load', () => {
    const frameWin = document.querySelector(`#${id} iframe`).contentWindow
    const frameDoc = frameWin.document

    if (css.length > 1) {
      const style = frameDoc.createElement('style')
      style.innerText = css
      frameDoc.head.appendChild(style)
    }
    if (js.length > 1) {
      const script = frameDoc.createElement('script')
      script.innerText = js
      frameDoc.body.appendChild(script)
    }
    if (html.length > 1) {
      frameDoc.body.innerHTML = html
    }
  })
  document.querySelector(`#${id}`).appendChild(iframe)
}

export const createIframe = (id, { html, css, js }) => {
  const iframe = document.createElement('iframe')
  iframe.addEventListener('load', () => {
    const frameWin = document.querySelector(`#${id} iframe`).contentWindow
    const frameDoc = frameWin.document
    const style = frameDoc.createElement('style')
    style.innerText = css
    const script = frameDoc.createElement('script')
    script.innerText = js
    frameDoc.head.appendChild(style)
    frameDoc.body.innerHTML = html
    frameDoc.body.appendChild(script)
  })
  document.querySelector(`#${id}`).appendChild(iframe)
}

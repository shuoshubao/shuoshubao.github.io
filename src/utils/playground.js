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
  let js = ''
  if (str.includes(`<${ScriptTagName}>`)) {
    js = str
      .slice(str.indexOf(`<${ScriptTagName}>`) + ScriptTagName.length + 2, str.indexOf(`</${ScriptTagName}>`))
      .trim()
  }
  return {
    html: html.trim(),
    css: css.trim(),
    js: js.trim()
  }
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
  return `
const loadScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.onload = () => {
      resolve();
    };
    script.src = src;
    document.head.appendChild(script);
  });
};
(async () => {
  const ScriptList = [
    'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
    'https://unpkg.com/antd@4.24.12/dist/antd.min.js',
    'https://unpkg.com/@babel/standalone@7.22.9/babel.min.js'
  ];
  for (const src of ScriptList) {
    await loadScript(src);
  }

  Object.keys(antd)
    .filter(v => !['version'].includes(v))
    .forEach(v => {
      window[v] = antd[v];
    });

  Object.keys(React)
    .filter(v => !['version'].includes(v))
    .forEach(v => {
      window[v] = React[v];
    });

  const script = document.createElement('script');
  script.innerHTML = \`${jsCode}\`;
  script.dataset.type = 'module';
  script.type = 'text/babel';
  script.presets = 'env,react';

  document.body.appendChild(script);
  window.dispatchEvent(new Event('DOMContentLoaded'));
})();
`
}

export const createIframe = (el, { html, css, js }) => {
  const iframe = document.createElement('iframe')

  iframe.addEventListener('load', async () => {
    const frameWin = iframe.contentWindow
    const frameDoc = frameWin.document

    const injectCss = () => {
      const link = frameDoc.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/antd@4.24.12/dist/antd.min.css'
      frameDoc.head.appendChild(link)
    }

    const injectJs = () => {
      const script = frameDoc.createElement('script')

      script.innerHTML = injectReact(js)

      frameDoc.body.appendChild(script)
    }

    injectCss()

    injectJs()

    if (css) {
      const style = frameDoc.createElement('style')

      style.innerHTML = await getCssCode(css)
      frameDoc.head.appendChild(style)
    }

    // 注入 html
    frameDoc.body.insertAdjacentHTML('afterbegin', html || '<div id="app"></div>')

    setInterval(() => {
      if (iframe.height !== Number(frameWin.document.documentElement.scrollHeight)) {
        iframe.height = frameWin.document.documentElement.scrollHeight
      }
    }, 3e3)
  })
  el.insertAdjacentElement('afterend', iframe)
}

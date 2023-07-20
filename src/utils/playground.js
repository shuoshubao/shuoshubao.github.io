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
(async () => {
  const ConsoleTimeKey = [window.name, 'initialized'].join('_');

  console.time(ConsoleTimeKey);

  window.React = window.parent.React;
  window.ReactDOM = window.parent.ReactDOM;
  window.dayjs = window.parent.dayjs;

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

  const ScriptList = [
    'https://unpkg.com/antd@5.7.1/dist/antd.min.js',
    'https://unpkg.com/@babel/standalone@7.22.9/babel.min.js'
  ];

  await Promise.all(ScriptList.map(loadScript));

  console.table({
    babel: Babel.version,
    react: React.version,
    'react-dom': ReactDOM.version,
    antd: antd.version
  });

  Object.keys(window.parent.antd)
    .filter(v => !['version'].includes(v))
    .forEach(v => {
      window[v] = window.antd[v];
    });

  Object.keys(React)
    .filter(v => !['version'].includes(v))
    .forEach(v => {
      window[v] = React[v];
    });

  const { code } = Babel.transform(\`${jsCode}\`, {
    filename: [window.name, '.js'].join(''),
    presets: ['env', 'react', 'typescript'],
    targets: {
      chrome: '200'
    }
  });

  const script = document.createElement('script');
  script.innerHTML = code;
  document.body.appendChild(script);

  console.timeEnd(ConsoleTimeKey);
})();
`
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

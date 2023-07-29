;(async () => {
  const ConsoleTimeKey = [window.name, 'initialized'].join('_')

  console.time(ConsoleTimeKey)

  window.React = window.parent.React
  window.ReactDOM = window.parent.ReactDOM
  window.dayjs = window.parent.dayjs

  const loadScript = src => {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.onload = () => {
        resolve()
      }
      script.src = src
      document.head.appendChild(script)
    })
  }

  const ScriptList = [
    'https://unpkg.com/antd@5.7.1/dist/antd.min.js',
    'https://unpkg.com/@babel/standalone@7.22.9/babel.min.js'
  ]

  await Promise.all(ScriptList.map(loadScript))

  const { Babel, React, ReactDOM, antd } = window

  console.table({
    babel: Babel.version,
    react: React.version,
    'react-dom': ReactDOM.version,
    antd: antd.version
  })

  Object.keys(window.parent.antd)
    .filter(v => !['version'].includes(v))
    .forEach(v => {
      window[v] = window.antd[v]
    })

  Object.keys(React)
    .filter(v => !['version'].includes(v))
    .forEach(v => {
      window[v] = React[v]
    })

  const { code } = Babel.transform(`jsCode`, {
    filename: [window.name, '.js'].join(''),
    presets: ['env', 'react', 'typescript'],
    targets: {
      chrome: '200'
    }
  })

  const script = document.createElement('script')
  script.innerHTML = code
  document.body.appendChild(script)

  window.parent.postMessage(
    {
      type: 'playground',
      id: window.name,
      eventName: 'initialized',
      initializedTime: Date.now() - PlaygroundStartTime
    },
    '/'
  )

  console.timeEnd(ConsoleTimeKey)
})()

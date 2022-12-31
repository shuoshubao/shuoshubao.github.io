import React from 'react'
import { HomeOutlined, ToolOutlined, BulbOutlined } from '@ant-design/icons'
import { map } from 'lodash-es'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import shell from 'highlight.js/lib/languages/shell'
import bash from 'highlight.js/lib/languages/bash'
import php from 'highlight.js/lib/languages/php'

export const isDark = () => {
  const { matchMedia } = window
  return matchMedia('(prefers-color-scheme: dark)').matches
}

export const addListenerPrefersColorScheme = callback => {
  const { matchMedia } = window
  matchMedia('(prefers-color-scheme: dark)').addListener(mediaQueryList => {
    callback(mediaQueryList.matches)
  })
  matchMedia('(prefers-color-scheme: light)').addListener(mediaQueryList => {
    callback(!mediaQueryList.matches)
  })
}

export const NavData = [
  {
    label: 'Home',
    value: 'index',
    icon: <HomeOutlined />
  },
  {
    label: 'JS',
    value: 'js',
    icon: (
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
        <path
          d="M617.728 635.008a173.269333 173.269333 0 0 1-93.312-16.981333 61.397333 61.397333 0 0 1-22.869333-43.093334 9.472 9.472 0 0 0-9.642667-9.386666 1997.909333 1997.909333 0 0 0-40.533333 0 9.002667 9.002667 0 0 0-9.856 7.936 99.797333 99.797333 0 0 0 32.128 78.677333 170.282667 170.282667 0 0 0 95.061333 35.797333 343.978667 343.978667 0 0 0 108.074667-4.608 133.376 133.376 0 0 0 71.594666-38.570666 99.754667 99.754667 0 0 0 16.896-95.189334 79.744 79.744 0 0 0-52.48-46.72c-54.613333-19.2-113.664-17.706667-169.386666-32.298666-9.685333-2.986667-21.504-6.314667-25.813334-16.554667a36.48 36.48 0 0 1 12.117334-40.746667 109.141333 109.141333 0 0 1 57.6-14.336 173.653333 173.653333 0 0 1 80.341333 11.52 61.269333 61.269333 0 0 1 29.312 42.325334 10.368 10.368 0 0 0 9.728 10.069333c13.397333 0.256 26.794667 0.042667 40.234667 0.085333a9.728 9.728 0 0 0 10.538666-7.168 103.850667 103.850667 0 0 0-50.645333-89.856 250.88 250.88 0 0 0-137.301333-21.034666 149.546667 149.546667 0 0 0-92.842667 37.333333 92.8 92.8 0 0 0-18.517333 96.512 82.346667 82.346667 0 0 0 51.968 45.312c54.485333 19.669333 114.176 13.354667 169.130666 30.762667 10.752 3.626667 23.210667 9.216 26.496 21.12a42.24 42.24 0 0 1-11.52 40.362666 126.72 126.72 0 0 1-76.501333 18.730667z m248.277333-360.32q-159.488-90.197333-319.104-180.266667a71.552 71.552 0 0 0-69.845333 0L159.146667 273.962667a65.792 65.792 0 0 0-34.346667 57.258666v361.6a66.261333 66.261333 0 0 0 35.669333 57.813334c30.421333 16.554667 59.989333 34.816 91.008 50.304a130.730667 130.730667 0 0 0 116.821334 3.2 90.752 90.752 0 0 0 42.453333-81.962667c0.213333-119.338667 0-238.677333 0.085333-357.973333a9.386667 9.386667 0 0 0-8.832-10.88 1773.013333 1773.013333 0 0 0-40.661333 0 8.96 8.96 0 0 0-9.728 9.088c-0.170667 118.570667 0.042667 237.141333-0.085333 355.754666a40.106667 40.106667 0 0 1-26.026667 37.674667 65.365333 65.365333 0 0 1-52.906667-7.082667l-84.565333-47.786666a10.112 10.112 0 0 1-5.76-10.026667V333.098667a11.050667 11.050667 0 0 1 6.698667-11.093334q158.421333-89.258667 316.8-178.645333a11.008 11.008 0 0 1 12.458666 0l316.842667 178.602667a11.178667 11.178667 0 0 1 6.656 11.093333v357.888a10.325333 10.325333 0 0 1-5.717333 10.154667q-155.989333 88.234667-312.192 176.213333c-4.949333 2.730667-10.837333 7.210667-16.64 3.84-27.306667-15.445333-54.186667-31.488-81.408-47.061333a8.789333 8.789333 0 0 0-9.813334-0.597334 222.634667 222.634667 0 0 1-37.632 17.578667c-5.888 2.389333-13.141333 3.072-17.194666 8.533333a56.149333 56.149333 0 0 0 18.432 13.226667l95.402666 55.168a69.546667 69.546667 0 0 0 70.613334 1.962667q158.976-89.6 317.952-179.370667a66.389333 66.389333 0 0 0 35.669333-57.770667V331.221333a65.706667 65.706667 0 0 0-33.194667-56.533333z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'Node',
    value: 'node',
    icon: (
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
        <path
          d="M512 1016c-13.4 0-27-3.6-38.8-10.4l-123.4-73c-18.4-10.4-9.4-14-3.4-16 24.6-8.6 29.6-10.4 55.8-25.4 2.8-1.6 6.4-1 9.2 0.8l94.8 56.2c3.4 2 8.2 2 11.4 0l369.4-213.2c3.4-2 5.6-6 5.6-10V298.6c0-4.2-2.2-8-5.8-10.2L517.6 75.4c-3.4-2-8-2-11.4 0L137.2 288.6c-3.6 2-5.8 6-5.8 10.2v426.2c0 4 2.2 8 5.8 9.8l101.2 58.4c55 27.4 88.6-4.8 88.6-37.4V335c0-6 4.8-10.6 10.8-10.6h46.8c5.8 0 10.8 4.6 10.8 10.6V756c0 73.2-40 115.2-109.4 115.2-21.4 0-38.2 0-85-23.2l-96.8-55.8C80.2 778.4 65.4 752.6 65.4 724.8V298.6c0-27.6 14.8-53.6 38.8-67.4L473.2 18c23.4-13.2 54.4-13.2 77.6 0l369.4 213.4c24 13.8 38.8 39.6 38.8 67.4v426.2c0 27.6-14.8 53.4-38.8 67.4L550.8 1005.6c-11.8 6.8-25.2 10.4-38.8 10.4z m298.2-420.2c0-79.8-54-101-167.4-116-114.8-15.2-126.4-23-126.4-49.8 0-22.2 9.8-51.8 94.8-51.8 75.8 0 103.8 16.4 115.4 67.6 1 4.8 5.4 8.4 10.4 8.4h48c3 0 5.8-1.2 7.8-3.4s3-5.2 2.8-8.2c-7.4-88.2-66-129.2-184.4-129.2-105.4 0-168.2 44.4-168.2 119 0 80.8 62.6 103.2 163.6 113.2 121 11.8 130.4 29.6 130.4 53.4 0 41.2-33.2 58.8-111 58.8-97.8 0-119.2-24.6-126.4-73.2-0.8-5.2-5.2-9-10.6-9h-47.8c-6 0-10.6 4.8-10.6 10.6 0 62.2 33.8 136.4 195.6 136.4 116.8-0.2 184-46.4 184-126.8z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'HTML',
    value: 'html',
    icon: (
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
        <path
          d="M128 64l69.8 791.6L511 960l315.2-104.4L896 64H128z m616.4 255.8H376.8l8.2 98.8h351.2l-27.2 296.8-195.8 54v0.6h-2.2l-197.4-54.6-12-151.6h95.4L404 640l107 29 107.4-29 12-124.4H296.6L271 224.4h482.2l-8.8 95.4z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'CSS',
    value: 'css',
    icon: (
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
        <path
          d="M128 64l69.8 791.6L512 960l314.2-104.4L896 64H128z m626.2 160l-9.6 94.6L514 417.2l-0.6 0.2h223l-25.6 293.2-196.4 57.4-197.6-58.4-12.8-147.8h97.8l6.4 76.6 105.2 26.6 109.4-30.8 7.4-123.2-332.6-1v-0.2l-0.4 0.2-7.2-92.6L514.2 324l13-5.4H281.4L269.8 224h484.4z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'Tool',
    value: 'tool',
    icon: <ToolOutlined />
  },
  {
    label: 'Assemble',
    value: 'assemble',
    icon: <BulbOutlined />
  }
]

export const getHashs = () => {
  return window.location.hash.slice(1).split('/').filter(Boolean)
}

export const getPageType = () => {
  const hashs = getHashs()
  const [category] = hashs
  if (hashs.length === 0) {
    return 'index'
  }
  if (!map(NavData.slice(1), 'value').includes(category)) {
    return '404'
  }
  if (hashs.length === 1) {
    return 'list'
  }
  if (hashs.length === 2) {
    return 'detail'
  }
  return '404'
}

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('less', less)
hljs.registerLanguage('json', json)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('php', php)

export const MarkdownItHighlight = MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const { value } = hljs.highlight(str.trim(), { language: lang })
        return [
          '<pre>',
          `<code class="hljs language-${lang}" lang="${lang}">`,
          ...value.split('\n').map(v => {
            return `<div class="line">${v}</div>`
          }),
          '<span class="markdown-code-btns">',
          `<span class="btn-lang">${lang}</span>`,
          '<span role="img" aria-label="copy" class="anticon anticon-copy"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg></span>',
          '</span>',
          '</code>',
          '</pre>'
        ].join('')
      } catch (__) {}
    }

    return ''
  }
})
